from fastapi import APIRouter, Depends
from src.api import dependencies
from src.schemas.sculping_nail_size import (
    SculpingNailSizeCreate,
    SculpingNailSizeUpdate,
)
from src.schemas.user import UserResponse
from src.services.sculping_nail_size_service import SculpingNailSizeService

from .dependencies import (
    get_sculping_nail_size_service,
)

router = APIRouter()


@router.post("/")
async def create(
    sculping_nail_size_in: SculpingNailSizeCreate,
    sculping_nail_size_service: SculpingNailSizeService = Depends(
        get_sculping_nail_size_service
    ),
    current_user: UserResponse = Depends(dependencies.get_current_user),
):
    return await sculping_nail_size_service.create_sculping_nail_size(
        user_id=current_user.user_id, sculping_nail_size_in=sculping_nail_size_in
    )


@router.get("/{skip}/{limit}")
async def get_all(
    skip: int = 0,
    limit: int = 100,
    sculping_nail_size_service: SculpingNailSizeService = Depends(
        get_sculping_nail_size_service
    ),
    current_user: UserResponse = Depends(dependencies.get_current_user),
):
    return await sculping_nail_size_service.get_all_sculping_nail_size(
        user_id=current_user.user_id, skip=skip, limit=limit
    )


@router.get("/by-id/{sculping_nail_size_id}")
async def get_by_id(
    sculping_nail_size_id: int,
    sculping_nail_size_service: SculpingNailSizeService = Depends(
        get_sculping_nail_size_service
    ),
    current_user: UserResponse = Depends(dependencies.get_current_user),
):
    return await sculping_nail_size_service.get_all_sculping_nail_size_by_id(
        user_id=current_user.user_id, sculping_nail_size_id=sculping_nail_size_id
    )


@router.put("/{sculping_nail_size_id}")
async def update(
    sculping_nail_size_id: int,
    sculping_nail_size_in: SculpingNailSizeUpdate,
    sculping_nail_size_service: SculpingNailSizeService = Depends(
        get_sculping_nail_size_service
    ),
    current_user: UserResponse = Depends(dependencies.get_current_user),
):
    return await sculping_nail_size_service.update_sculping_nail_size(
        sculping_nail_size_id=sculping_nail_size_id,
        sculping_nail_size_in=sculping_nail_size_in,
    )


@router.delete("/{sculping_nial_size_id]")
async def delete(
    sculping_nail_size_id: int,
    sculping_nail_size_service: SculpingNailSizeService = Depends(
        get_sculping_nail_size_service
    ),
    current_user: UserResponse = Depends(dependencies.get_current_user),
):
    return await sculping_nail_size_service.delete_sculping_nail_size(
        sculping_nail_size_id
    )
