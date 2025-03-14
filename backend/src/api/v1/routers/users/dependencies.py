from fastapi import Depends

from src.api import dependencies
from src.repositories.user_repository import UserRepository
from src.services.user_service import UserService


def get_user_service(db=Depends(dependencies.get_db)):
    user_repo = UserRepository(db)
    return UserService(user_repo)
