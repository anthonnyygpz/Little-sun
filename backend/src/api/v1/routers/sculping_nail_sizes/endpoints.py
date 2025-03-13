from fastapi import APIRouter, Depends
from src.api import dependencies
from src.models.user import User
from src.schemas.sculping_nail_size import (
    SculpingNailSizeCreate,
    SculpingNailSizeUpdate,
)
from src.api.v1.routers.sculping_nail_sizes.dependencies import (
    get_sculping_nail_size_service,
)
from src.services.sculping_nail_size_service import SculpingNailSizeService

router = APIRouter()


@router.post("/")
async def create(
    sculping_nail_size_in: SculpingNailSizeCreate,
    sculping_nail_size_service: SculpingNailSizeService = Depends(
        get_sculping_nail_size_service
    ),
    current_user: User = Depends(dependencies.get_current_user),
):
    return await sculping_nail_size_service.create_sculping_nail_size(
        sculping_nail_size_in
    )


@router.get("/by-id/{sculping_nail_size_id}")
async def get_by_id(
    sculping_nail_size_id: int,
    sculping_nail_size_service: SculpingNailSizeService = Depends(
        get_sculping_nail_size_service
    ),
    current_user: User = Depends(dependencies.get_current_user),
):
    return await sculping_nail_size_service.get_all_sculping_nail_size_by_id(
        sculping_nail_size_id
    )


@router.put("/{sculping_nail_size_id}")
async def update(
    sculping_nail_size_id: int,
    sculping_nail_size_in: SculpingNailSizeUpdate,
    sculping_nail_size_service: SculpingNailSizeService = Depends(
        get_sculping_nail_size_service
    ),
    current_user: User = Depends(dependencies.get_current_user),
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
    current_user: User = Depends(dependencies.get_current_user),
):
    return await sculping_nail_size_service.delete_sculping_nail_size(
        sculping_nail_size_id
    )
