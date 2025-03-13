from typing import List
from fastapi import APIRouter, Depends, status
from src.api import dependencies
from src.api.v1.routers.nail_services.dependencies import get_nail_service_service
from src.models.user import User
from src.schemas.nail_service import (
    NailServiceCreate,
    NailServiceResponse,
    NailServiceUpdate,
)
from src.services.nail_service_service import NailServiceService

router = APIRouter()


@router.post(
    "/", response_model=NailServiceResponse, status_code=status.HTTP_201_CREATED
)
async def create(
    nail_service_in: NailServiceCreate,
    nail_service_service: NailServiceService = Depends(get_nail_service_service),
    current_user: User = Depends(dependencies.get_current_user),
):
    return await nail_service_service.create_nail_service(nail_service_in)


@router.get("/", response_model=List[NailServiceResponse])
async def get_all(
    skip: int = 0,
    limit: int = 100,
    nail_service_service: NailServiceService = Depends(get_nail_service_service),
    current_user: User = Depends(dependencies.get_current_user),
):
    return await nail_service_service.get_all_nail_service(skip=skip, limit=limit)


@router.get("/by-name")
async def get_by_name(
    name_in: str,
    nail_service_service: NailServiceService = Depends(get_nail_service_service),
    current_user: User = Depends(dependencies.get_current_user),
):
    return await nail_service_service.get_nail_service_by_name(name_in)


@router.put("/{nail_service_id}")
async def update(
    nail_service_id: int,
    nail_service_in: NailServiceUpdate,
    nail_service_service: NailServiceService = Depends(get_nail_service_service),
    current_user: User = Depends(dependencies.get_current_user),
):
    return await nail_service_service.update_nail_service(
        nail_service_id=nail_service_id, nail_service_in=nail_service_in
    )


@router.delete("/{nail_service_id}")
async def delete(
    nail_service_id: int,
    nail_service_service: NailServiceService = Depends(get_nail_service_service),
    current_user: User = Depends(dependencies.get_current_user),
):
    return await nail_service_service.delete_nail_service(nail_service_id)
