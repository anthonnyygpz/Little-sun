from dataclasses import dataclass
from typing import List

from src.repositories.interfaces import ISculpingNailSizeRepository
from src.schemas.sculping_nail_size import (
    SculpingNailSizeCreate,
    SculpingNailSizeResponse,
    SculpingNailSizeUpdate,
)


@dataclass
class SculpingNailSizeService:
    sculping_nail_size_repo: ISculpingNailSizeRepository

    async def create_sculping_nail_size(
        self, user_id: int, sculping_nail_size_in: SculpingNailSizeCreate
    ) -> SculpingNailSizeResponse:
        return await self.sculping_nail_size_repo.create_sculping_nail_size(
            user_id=user_id, sculping_nail_size_in=sculping_nail_size_in
        )

    async def get_all_sculping_nail_size(
        self, user_id: int, skip: int, limit: int
    ) -> List[SculpingNailSizeResponse]:
        return await self.sculping_nail_size_repo.get_all_sculping_nail_size(
            user_id=user_id, skip=skip, limit=limit
        )

    async def get_all_sculping_nail_size_by_id(
        self, user_id: int, sculping_nail_size_id: int
    ) -> List[SculpingNailSizeResponse]:
        return await self.sculping_nail_size_repo.get_all_sculping_nail_size_by_id(
            user_id=user_id, sculping_nail_size_id=sculping_nail_size_id
        )

    async def update_sculping_nail_size(
        self,
        sculping_nail_size_id: int,
        sculping_nail_size_in: SculpingNailSizeUpdate,
    ) -> SculpingNailSizeResponse:
        return await self.sculping_nail_size_repo.update_sculping_nail_size(
            sculping_nail_size_id=sculping_nail_size_id,
            sculping_nail_size_in=sculping_nail_size_in,
        )

    async def delete_sculping_nail_size(self, sculping_nail_size_id: int) -> bool:
        return await self.sculping_nail_size_repo.delete_sculping_nail_size(
            sculping_nail_size_id
        )
