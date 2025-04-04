from typing import List

from fastapi import APIRouter, Depends, status
from src.api import dependencies
from src.schemas.nail_design import (
    NailDesignCreate,
    NailDesignResponse,
    NailDesignUpdate,
)
from src.schemas.user import UserResponse
from src.services.nail_design_service import NailDesignService

from .dependencies import get_nail_design_service

router = APIRouter()


@router.post(
    "/", response_model=NailDesignResponse, status_code=status.HTTP_201_CREATED
)
async def create(
    nail_design_in: NailDesignCreate,
    nail_design_service: NailDesignService = Depends(get_nail_design_service),
    current_user: UserResponse = Depends(dependencies.get_current_user),
):
    return await nail_design_service.create_nail_design(
        user_id=current_user.user_id, nail_design_in=nail_design_in
    )


@router.get("/", response_model=List[NailDesignResponse])
async def get_all(
    skip: int = 0,
    limit: int = 100,
    nail_design_service: NailDesignService = Depends(get_nail_design_service),
    current_user: UserResponse = Depends(dependencies.get_current_user),
):
    return await nail_design_service.get_all_nail_design(
        user_id=current_user.user_id, skip=skip, limit=limit
    )


@router.put("/{nail_desing_id}")
async def update(
    nail_design_id: int,
    nail_desing_in: NailDesignUpdate,
    nail_design_service: NailDesignService = Depends(get_nail_design_service),
    current_user: UserResponse = Depends(dependencies.get_current_user),
):
    return await nail_design_service.update_nail_design(
        user_id=current_user.user_id,
        nail_design_in=nail_desing_in,
        nail_design_id=nail_design_id,
    )


@router.delete("/{nail_design_id}")
async def delete(
    nail_design_id: int,
    nail_design_service: NailDesignService = Depends(get_nail_design_service),
    current_user: UserResponse = Depends(dependencies.get_current_user),
):
    return await nail_design_service.delete_nail_design(nail_design_id=nail_design_id)
