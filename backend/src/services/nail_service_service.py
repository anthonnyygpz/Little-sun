from dataclasses import dataclass
from typing import List, Optional

from fastapi import HTTPException, status
from src.models.nail_service import NailService
from src.repositories.interfaces import INailServiceRepository
from src.schemas.nail_service import NailServiceCreate, NailServiceUpdate


@dataclass
class NailServiceService:
    nail_service_repo: INailServiceRepository

    async def create_nail_service(
        self, nail_service_in: NailServiceCreate
    ) -> NailService:
        nail_service = await self.get_nail_service_by_name(
            name_in=nail_service_in.service_name
        )
        if nail_service:
            raise HTTPException(
                status_code=status.HTTP_302_FOUND,
                detail="Already exist this nail service",
            )
        nail_service = await self.nail_service_repo.create_nail_service(nail_service_in)
        return nail_service

    async def get_all_nail_service(self, skip: int, limit: int) -> List[NailService]:
        nail_service = await self.nail_service_repo.get_all_nail_service(
            skip=skip, limit=limit
        )
        if nail_service:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="The nail service not found",
            )
        return nail_service

    async def get_nail_service_by_name(self, name_in: str) -> Optional[NailService]:
        nail_service = await self.nail_service_repo.get_nail_service_by_name(name_in)
        if nail_service:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Already exist nail service",
            )
        return nail_service

    async def get_nail_service_by_id(
        self, nail_service_id: int
    ) -> Optional[NailService]:
        return await self.nail_service_repo.get_nail_service_by_id(nail_service_id)

    async def update_nail_service(
        self, nail_service_id: int, nail_service_in: NailServiceUpdate
    ) -> NailService:
        nail_service = await self.get_nail_service_by_id(
            nail_service_id=nail_service_id
        )
        if nail_service:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="The nail service not found",
            )
        nail_service = await self.nail_service_repo.update_nail_service(
            nail_service_id=nail_service_id, nail_service_in=nail_service_in
        )
        return nail_service

    async def delete_nail_service(self, nail_service_id: int) -> bool:
        return await self.nail_service_repo.delete_nail_service(nail_service_id)
