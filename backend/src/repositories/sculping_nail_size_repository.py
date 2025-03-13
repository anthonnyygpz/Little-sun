from dataclasses import dataclass
from typing import List

from sqlalchemy.orm import Session

from src.models.sculping_size import SculpingNailSize
from src.repositories.interfaces import ISculpingNailSizeRepository
from src.schemas.sculping_nail_size import (
    SculpingNailSizeCreate,
    SculpingNailSizeUpdate,
)


@dataclass
class SculpingNailSizeRepository(ISculpingNailSizeRepository):
    db: Session

    async def create_sculping_nail_size(
        self, sculping_nail_size_in: SculpingNailSizeCreate
    ) -> SculpingNailSize:
        db_sculping_nail_size = SculpingNailSize(
            size_name=sculping_nail_size_in.size_name,
            base_price=sculping_nail_size_in.base_price,
        )
        self.db.add(db_sculping_nail_size)
        self.db.commit()
        self.db.refresh(db_sculping_nail_size)
        return db_sculping_nail_size

    async def get_all_sculping_nail_size_by_id(
        self, size_id: int
    ) -> List[SculpingNailSize]:
        return self.db.query(SculpingNailSize).filter_by(size_id=size_id).all()

    async def update_sculping_nail_size(
        self, sculping_nail_size_id: int, sculping_nail_size_in: SculpingNailSizeUpdate
    ) -> SculpingNailSize:
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
