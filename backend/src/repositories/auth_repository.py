from dataclasses import dataclass

from sqlalchemy.orm import Session

from src.models.user import User
from .interfaces import IAuthRepository


@dataclass
class AuthRepository(IAuthRepository):
    db: Session
