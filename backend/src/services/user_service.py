from dataclasses import dataclass
from fastapi import HTTPException, status

from src.repositories.interfaces import IUserRepository
from src.schemas.user import UserCreate


@dataclass
class UserService:
    user_repo: IUserRepository

    async def create_user(self, user_in: UserCreate):
        user = await self.user_repo.get_by_email(email=user_in.email)
        if user:
            raise HTTPException(
                status_code=status.HTTP_302_FOUND, detail="Already exist email"
            )

        user = await self.user_repo.create_user(user_in=user_in)
        return user

    async def get_user_by_email(self, email: str):
        return await self.user_repo.get_by_email(email=email)
