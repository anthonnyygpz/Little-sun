from dataclasses import dataclass
from typing import List

from src.models.sculping_size import SculpingNailSize
from src.repositories.interfaces import ISculpingNailSizeRepository
from src.schemas.sculping_nail_size import (
    SculpingNailSizeCreate,
    SculpingNailSizeUpdate,
)


@dataclass
class SculpingNailSizeService:
    sculping_nail_size_repo: ISculpingNailSizeRepository

    async def create_sculping_nail_size(
        self, sculping_nail_size_in: SculpingNailSizeCreate
    ) -> SculpingNailSize:
        return await self.sculping_nail_size_repo.create_sculping_nail_size(
            sculping_nail_size_in
        )

    async def get_all_sculping_nail_size_by_id(
        self, sculping_nail_size_id: int
    ) -> List[SculpingNailSize]:
        return await self.sculping_nail_size_repo.get_all_sculping_nail_size_by_id(
            sculping_nail_size_id
        )

    async def update_sculping_nail_size(
        self, sculping_nail_size_id: int, sculping_nail_size_in: SculpingNailSizeUpdate
    ) -> SculpingNailSize:
        return await self.sculping_nail_size_repo.update_sculping_nail_size(
            sculping_nail_size_id=sculping_nail_size_id,
            sculping_nail_size_in=sculping_nail_size_in,
        )

    async def delete_sculping_nail_size(self, sculping_nail_size_id: int) -> bool:
        return await self.sculping_nail_size_repo.delete_sculping_nail_size(
            sculping_nail_size_id
        )
