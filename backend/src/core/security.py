from datetime import datetime, timedelta, timezone

from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa
from fastapi import Depends, HTTPException, status
from jose import ExpiredSignatureError, JWTError, jwt
from jose.exceptions import JWEInvalidAuth, JWSSignatureError
from passlib.context import CryptContext

from .config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


async def generate_keys():
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


def create_access_token(*, data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRATION_MINUTES
        )
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM,
    )
    return encoded_jwt


async def decode_token(token: str):
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        return payload
    except JWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e),
            headers={"WWW-Authenticate": "Bearer"},
        )


async def create_refesh_token(token: str, expires_delta: timedelta | None = None):
    # expire = datetime.now(timezone.utc) + (expires_delta or timedelta(days=7))
    # payload = {"sub": user_id, "exp": expire, "type": "refresh"}
    # token = jwt.encode(
    #     payload, settings.REFRESH_TOKEN_SECRET, algorithm=settings.ALGORITHM
    # )
    # hashed_token = pwd_context.hash(token)

    return


# async def verify_token(token: str):
#     try:
#         payload = await decode_token(token)
#         return payload
#     except JWSSignatureError:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Token invalid",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
