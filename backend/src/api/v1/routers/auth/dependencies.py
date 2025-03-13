from fastapi import Depends
from .....api import dependencies
from .....repositories.auth_repository import AuthRepository
from .....services.auth_service import AuthService


def get_auth_service(db=Depends(dependencies.get_db)):
    auth_repo = AuthRepository(db)
    return AuthService(auth_repo)
