from dataclasses import dataclass
from typing import List

from sqlalchemy.orm import Session
from src.models.sculping_size import SculpingNailSize
from src.schemas.sculping_nail_size import (
    SculpingNailSizeCreate,
    SculpingNailSizeResponse,
    SculpingNailSizeUpdate,
)

from .interfaces import ISculpingNailSizeRepository


@dataclass
class SculpingNailSizeRepository(ISculpingNailSizeRepository):
    db: Session

    async def create_sculping_nail_size(
        self, user_id: int, sculping_nail_size_in: SculpingNailSizeCreate
    ) -> SculpingNailSizeResponse:
        db_sculping_nail_size = SculpingNailSize(
            size_name=sculping_nail_size_in.size_name,
            base_price=sculping_nail_size_in.base_price,
            user_id=user_id,
        )
        self.db.add(db_sculping_nail_size)
        self.db.commit()
        self.db.refresh(db_sculping_nail_size)
        return db_sculping_nail_size

    async def get_all_sculping_nail_size(
        self, user_id: int, skip: int, limit: int
    ) -> List[SculpingNailSizeResponse]:
        return (
            self.db.query(SculpingNailSize)
            .filter_by(user_id=user_id)
            .offset(skip)
            .limit(limit)
            .all()  # type: ignore
        )

    async def get_all_sculping_nail_size_by_id(
        self, user_id: int, sculping_nail_size_id: int
    ) -> List[SculpingNailSizeResponse]:
        return (
            self.db.query(SculpingNailSize)
            .filter_by(user_id=user_id, size_id=sculping_nail_size_id)
            .all()  # type: ignore
        )

    async def update_sculping_nail_size(
        self, sculping_nail_size_id: int, sculping_nail_size_in: SculpingNailSizeUpdate
    ) -> SculpingNailSizeResponse:
        db_sculping_nail_size = (
            self.db.query(SculpingNailSize)
            .filter_by(size_id=sculping_nail_size_id)
            .first()
        )

        if db_sculping_nail_size:
            update_data = sculping_nail_size_in.model_dump(exclude_unset=True)
            for key, value in update_data.items():
                setattr(db_sculping_nail_size, key, value)
            self.db.commit()
            self.db.refresh(db_sculping_nail_size)
        return db_sculping_nail_size

    async def delete_sculping_nail_size(self, sculping_nail_size_id: int) -> bool:
        db_sculping_nail_size = (
            self.db.query(SculpingNailSize)
            .filter_by(size_id=sculping_nail_size_id)
            .first()
        )

        if db_sculping_nail_size:
            self.db.delete(db_sculping_nail_size)
            self.db.commit()
            return True
        return False
