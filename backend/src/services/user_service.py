from dataclasses import dataclass

from ..repositories.interfaces import IUserRepository
from ..schemas.user import UserCreate


@dataclass
class UserService:
    user_repo: IUserRepository

    async def create_user(self, user_in: UserCreate):
        return await self.user_repo.create_user(user_in=user_in)

    async def get_user_by_email(self, email: str):
        return await self.user_repo.get_by_email(email=email)
