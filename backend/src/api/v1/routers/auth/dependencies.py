from src.api import dependencies
from fastapi import Depends
from src.repositories.auth_repository import AuthRepository
from src.services.auth_service import AuthService


def get_auth_service(db=Depends(dependencies.get_db)):
    auth_repo = AuthRepository(db)
    return AuthService(auth_repo)
