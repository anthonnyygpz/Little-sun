from typing import Generator
from fastapi import Depends, status, HTTPException
from sqlalchemy.orm import Session
from ..db.session import SessionLocal
from fastapi.security import OAuth2PasswordBearer
from ..core.security import decode_token
from ..repositories.user_repository import UserRepository

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")


def get_db() -> Generator:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


async def get_current_user(
    token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    payload = decode_token(token)
    if not payload:
        raise credentials_exception

    email = payload.get("sub")
    if email is None:
        raise credentials_exception

    user = await UserRepository(db).get_by_email(email=email)
    if user is None:
        raise credentials_exception
    return user
