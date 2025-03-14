from fastapi import APIRouter, Depends

from src.schemas.user import UserCreate
from src.services.user_service import UserService
from .dependencies import get_user_service

router = APIRouter()


@router.post("/")
async def create(
    user_in: UserCreate,
    user_service: UserService = Depends(get_user_service),
):
    return await user_service.create_user(user_in=user_in)


# @router.get("/get")
# def get(db: Session = Depends(dependencies.get_db)):
#     return
#
#
# @router.put("/update")
# def update(db: Session = Depends(dependencies.get_db)):
#     return
#
#
# @router.delete("/delete")
# def delete(db: Session = Depends(dependencies.get_db)):
#     return
