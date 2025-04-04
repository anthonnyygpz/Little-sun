import json
from dataclasses import dataclass
from datetime import timedelta
from os import stat

from fastapi import HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from jose import jwe
from jose.constants import ALGORITHMS
from sqlalchemy.orm.path_registry import TokenRegistry
from sqlalchemy.util import py310
from src.core.config import settings
from src.core.security import (
    create_access_token,
    create_refesh_token,
    decode_token,
    generate_keys,
    verify_password,
)
from src.repositories.interfaces import IAuthRepository
from src.schemas.user import UserResponse


@dataclass
class AuthService:
    auth_repo: IAuthRepository

    # async def encrypted_token(self):
    #     # Datos a encriptar (formato JSON)
    #     keys = await generate_keys()
    #     public_key = keys["public"]
    #     pem_private = keys["private"]
    #
    #     payload = {
    #         "sub": "usuario123",
    #         "var": {"name": "Antonio", "password": "12345678"},
    #         "exp": 1767225600,
    #         "iat": 1620000000,
    #     }
    #
    #     # Obtener la clave privada
    #     payload_json = json.dumps(payload)
    #
    #     # Encriptar con clave pública
    #     encrypted_jwt = jwe.encrypt(
    #         payload_json,
    #         public_key,
    #         algorithm=ALGORITHMS.RSA_OAEP_256,  # Algoritmo para la clave
    #         encryption=ALGORITHMS.A256GCM,  # Algoritmo para el contenido
    #     )
    #
    #     decrypted_payload = jwe.decrypt(encrypted_jwt, pem_private)
    #     if decrypted_payload:
    #         data = json.loads(decrypted_payload)
    #         print("Datos desencriptados:", data)
    #         return data

    async def validate_token(self, token: str):
        return await decode_token(token)

    async def refresh_token(self, token: str):
        return await create_refesh_token(token=token)

    async def login(self, form_data: OAuth2PasswordRequestForm, user_in: UserResponse):
        if not user_in or not verify_password(
            form_data.password,
            user_in.password_hashed,  # type: ignore
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
            data={"sub": str(user_in.user_id)},
            expires_delta=access_token_expires,
        )
        return {
            "access_token": access_token,
            "token_type": "Bearer",
        }
