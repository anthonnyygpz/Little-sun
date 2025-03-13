from dataclasses import dataclass

from fastapi import HTTPException, status
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from ..core.security import get_password_hash

from ..models.user import User
from ..repositories.interfaces import IUserRepository
from ..schemas.user import UserCreate


@dataclass
class UserRepository(IUserRepository):
    db: Session

    async def create_user(self, user_in: UserCreate) -> User:
        try:
            db_user = User(
                email=user_in.email,
                username=user_in.username,
                password_hashed=get_password_hash(password=user_in.password),
            )
            self.db.add(db_user)
            self.db.commit()
            self.db.refresh(db_user)
            return db_user
        except SQLAlchemyError as he:
            self.db.rollback()
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(he))
        except Exception as e:
            self.db.rollback()
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))

    async def get_by_email(self, email: str) -> User:
        return self.db.query(User).filter_by(email=email).first()
