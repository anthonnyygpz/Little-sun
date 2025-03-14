from dataclasses import dataclass
from typing import List, Optional

from fastapi import HTTPException, status
from src.models.nail_design import NailDesign
from src.repositories.interfaces import INailDesignRepository
from src.schemas.nail_design import NailDesignCreate, NailDesignUpdate


@dataclass
class NailDesignService:
    nail_design_repo: INailDesignRepository

    async def create_nail_design(self, nail_design_in: NailDesignCreate) -> NailDesign:
        nail_design = await self.nail_design_repo.get_nail_design_by_name(
            name_in=nail_design_in.design_name
        )
        if nail_design:
            raise HTTPException(
                status_code=status.HTTP_302_FOUND,
                detail="This nail design already exists",
            )
        nail_design = await self.nail_design_repo.create_nail_design(nail_design_in)
        return nail_design

    async def get_all_nail_design(
        self,
    ) -> Optional[List[NailDesign]]:
        nail_design = await self.nail_design_repo.get_all_nail_design()
        if not nail_design:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="The nail design not found",
            )

        return nail_design

    async def get_nail_design_by_name(self, name_in: str) -> Optional[NailDesign]:
        return await self.nail_design_repo.get_nail_design_by_name(name_in=name_in)

    async def get_nail_design_by_id(self, nail_design_id: int) -> Optional[NailDesign]:
        return await self.nail_design_repo.get_nail_design_by_id(
            nail_design_id=nail_design_id
        )

    async def update_nail_design(
        self, nail_design_in: NailDesignUpdate, nail_design_id: int
    ) -> NailDesign:
        if nail_design_in.design_name:
            nail_design = self.nail_design_repo.get_nail_design_by_name(
                name_in=nail_design_in.design_name
            )
            if nail_design:
                raise HTTPException(
                    status_code=status.HTTP_302_FOUND,
                    detail="Already exist this design",
                )
        return await self.nail_design_repo.update_nail_design(
            nail_design_in=nail_design_in, nail_design_id=nail_design_id
        )

    async def delete_nail_design(self, nail_design_id: int) -> bool:
        return await self.nail_design_repo.delete_nail_design(nail_design_id)
