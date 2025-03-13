from fastapi import Depends

from .... import dependencies
from .....repositories.user_repository import UserRepository
from .....services.user_service import UserService


def get_user_service(db=Depends(dependencies.get_db)):
    user_repo = UserRepository(db)
    return UserService(user_repo)
