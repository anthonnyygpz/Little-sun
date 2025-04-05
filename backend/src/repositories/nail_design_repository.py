from dataclasses import dataclass
from typing import List, Optional

from fastapi import HTTPException, status
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session
from src.models.nail_design import NailDesign
from src.schemas.nail_design import (
    NailDesignCreate,
    NailDesignResponse,
    NailDesignUpdate,
)

from .interfaces import INailDesignRepository


@dataclass
class NailDesignRepository(INailDesignRepository):
    db: Session

    async def create_nail_design(
        self, user_id: int, nail_design_in: NailDesignCreate
    ) -> NailDesignResponse:
        try:
            db_nail_design = NailDesign(
                design_name=nail_design_in.design_name,
                base_price=nail_design_in.base_price,
                user_id=user_id,
            )
            self.db.add(db_nail_design)
            self.db.commit()
            self.db.refresh(db_nail_design)
            return db_nail_design
        except SQLAlchemyError as he:
            self.db.rollback()
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(he))
        except Exception as e:
            self.db.rollback()
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))

    async def get_all_nail_design(
        self, user_id: int, skip: int, limit: int
    ) -> List[NailDesignResponse]:
        return (
            self.db.query(NailDesign)
            .filter_by(user_id=user_id)
            .offset(skip)
            .limit(limit)
            .all()  # type: ignore
        )

    async def get_nail_design_by_name(
        self, user_id: int, name_in: str
    ) -> Optional[NailDesignResponse]:
        return (
            self.db.query(NailDesign)
            .filter_by(user_id=user_id, design_name=name_in)
            .first()
        )

    async def get_nail_design_by_id(
        self, user_id: int, nail_design_id: int
    ) -> Optional[NailDesignResponse]:
        return (
            self.db.query(NailDesign)
            .filter_by(user_id=user_id, design_id=nail_design_id)
            .first()
        )

    async def update_nail_design(
        self, nail_design_in: NailDesignUpdate, nail_design_id: int
    ):
        db_nail_design = (
            self.db.query(NailDesign).filter_by(design_id=nail_design_id).first()
        )
        if db_nail_design:
            update_data = nail_design_in.model_dump(exclude_unset=True)
            for key, value in update_data.items():
                setattr(db_nail_design, key, value)
            self.db.commit()
            self.db.refresh(db_nail_design)
        return db_nail_design

    async def delete_nail_design(self, nail_design_id: int) -> bool:
        db_nail_design = (
            self.db.query(NailDesign).filter_by(design_id=nail_design_id).first()
        )
        if db_nail_design:
            self.db.delete(db_nail_design)
            self.db.commit()
            return True
        return False
