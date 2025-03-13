from dataclasses import dataclass

from sqlalchemy.orm import Session

from ..models.user import User
from ..repositories.interfaces import IAuthRepository


@dataclass
class AuthRepository(IAuthRepository):
    db: Session
