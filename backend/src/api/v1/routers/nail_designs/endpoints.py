from typing import List

from fastapi import APIRouter, Depends
from src.api import dependencies
from src.models.user import User
from src.schemas.nail_design import (
    NailDesignCreate,
    NailDesignResponse,
    NailDesignUpdate,
)
from src.services.nail_design_service import NailDesignService

from .dependencies import get_nail_design_service

router = APIRouter()


@router.post("/", response_model=NailDesignResponse)
async def create(
    nail_design_in: NailDesignCreate,
    nail_design_service: NailDesignService = Depends(get_nail_design_service),
    current_user: User = Depends(dependencies.get_current_user),
):
    return await nail_design_service.create_nail_design(nail_design_in)


@router.get("/", response_model=List[NailDesignResponse])
async def get_all(
    nail_design_service: NailDesignService = Depends(get_nail_design_service),
    current_user: User = Depends(dependencies.get_current_user),
):
    return await nail_design_service.get_all_nail_design()


@router.put("/{nail_desing_id}")
async def update(
    nail_design_id: int,
    nail_desing_in: NailDesignUpdate,
    nail_design_service: NailDesignService = Depends(get_nail_design_service),
    current_user: User = Depends(dependencies.get_current_user),
):
    return await nail_design_service.update_nail_design(
        nail_design_in=nail_desing_in, nail_design_id=nail_design_id
    )


@router.delete("/{nail_design_id}")
async def delete(
    nail_design_id: int,
    nail_design_service: NailDesignService = Depends(get_nail_design_service),
    current_user: User = Depends(dependencies.get_current_user),
):
    return await nail_design_service.delete_nail_design(nail_design_id=nail_design_id)
