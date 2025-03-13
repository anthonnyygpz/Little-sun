from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm

from .....services.auth_service import AuthService
from .....services.user_service import UserService
from ..users.dependencies import get_user_service
from .dependencies import get_auth_service

router = APIRouter()


@router.post("/login")
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    auth_service: AuthService = Depends(get_auth_service),
    user_service: UserService = Depends(get_user_service),
):
    user = await user_service.get_user_by_email(email=form_data.username)
    return await auth_service.login(form_data=form_data, user_in=user)
