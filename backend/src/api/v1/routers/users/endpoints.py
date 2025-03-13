from fastapi import APIRouter, Depends

from .....schemas.user import UserCreate
from .....services.user_service import UserService
from . import dependencies

router = APIRouter()


@router.post("/")
async def create(
    user_in: UserCreate,
    user_service: UserService = Depends(dependencies.get_user_service),
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
