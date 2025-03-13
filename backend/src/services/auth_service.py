import json
from dataclasses import dataclass
from datetime import timedelta

from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa
from fastapi import HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from jose import jwe
from jose.constants import ALGORITHMS

from ..core.config import settings
from ..core.security import create_access_token, verify_password
from ..repositories.interfaces import IAuthRepository
from ..schemas.user import UserResponse


@dataclass
class AuthService:
    auth_repo: IAuthRepository

    async def generate_keys(self):
        private_key = rsa.generate_private_key(public_exponent=65537, key_size=4096)

        pem_private = private_key.private_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PrivateFormat.PKCS8,
            encryption_algorithm=serialization.NoEncryption(),
        )

        pem_public = private_key.public_key().public_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PublicFormat.SubjectPublicKeyInfo,
        )
        return {"private": pem_private, "public": pem_public}

    async def encrypted_token(self):
        # Datos a encriptar (formato JSON)
        keys = await self.generate_keys()
        public_key = keys["public"]
        pem_private = keys["private"]

        payload = {
            "sub": "usuario123",
            "var": {"name": "Antonio", "password": "12345678"},
            "exp": 1767225600,
            "iat": 1620000000,
        }

        # Obtener la clave privada
        payload_json = json.dumps(payload)

        # Encriptar con clave pública
        encrypted_jwt = jwe.encrypt(
            payload_json,
            public_key,
            algorithm=ALGORITHMS.RSA_OAEP_256,  # Algoritmo para la clave
            encryption=ALGORITHMS.A256GCM,  # Algoritmo para el contenido
        )

        decrypted_payload = jwe.decrypt(encrypted_jwt, pem_private)
        if decrypted_payload:
            data = json.loads(decrypted_payload)
            print("Datos desencriptados:", data)
            return data

    async def login(self, form_data: OAuth2PasswordRequestForm, user_in: UserResponse):
        if not user_in or not verify_password(
            form_data.password, user_in.password_hashed
        ):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or passrowd",
                headers={"WWW-Authenticate": "Bearer"},
            )

        access_token_expires = timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRATION_MINUTES
        )
        access_token = create_access_token(
            data={"sub": user_in.email}, expires_delta=access_token_expires
        )
        return {"access_token": access_token, "token_type": "Bearer"}

    # async def get_user_by_email(self, email: str) -> User:
    #     return await self.auth_repo.get_by_email(email=email)
    #
