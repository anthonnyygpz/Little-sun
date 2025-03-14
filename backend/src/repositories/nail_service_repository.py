from dataclasses import dataclass
from typing import List, Optional

from sqlalchemy.orm import Session
from src.models.nail_service import NailService
from src.schemas.nail_service import NailServiceCreate, NailServiceUpdate

from .interfaces import INailServiceRepository


@dataclass
class NailServiceRepository(INailServiceRepository):
    db: Session

    async def create_nail_service(
        self, nail_service_in: NailServiceCreate
    ) -> NailService:
        db_nail_service = NailService(
            service_name=nail_service_in.service_name,
            base_price=nail_service_in.base_price,
        )
        self.db.add(db_nail_service)
        self.db.commit()
        self.db.refresh(db_nail_service)
        return db_nail_service

    async def get_all_nail_service(self, skip: int, limit: int) -> List[NailService]:
        return self.db.query(NailService).offset(skip).limit(limit).all()

    async def get_nail_service_by_name(self, name_in: str) -> NailService:
        return self.db.query(NailService).filter_by(service_name=name_in).first()

    async def get_nail_service_by_id(
        self, nail_service_id: int
    ) -> Optional[NailService]:
        return self.db.query(NailService).filter_by(service_id=nail_service_id).first()

    async def update_nail_service(
        self, nail_service_id: int, nail_service_in: NailServiceUpdate
    ) -> NailService:
        db_nail_service = (
            self.db.query(NailService).filter_by(service_id=nail_service_id).first()
        )
        if db_nail_service:
            update_data = nail_service_in.model_dump(exclude_unset=True)
            for key, value in update_data.items():
                setattr(db_nail_service, key, value)
            self.db.commit()
            self.db.refresh(db_nail_service)

        return db_nail_service

    async def delete_nail_service(self, nail_service_id: int) -> bool:
        db_nail_service = (
            self.db.query(NailService).filter_by(service_id=nail_service_id).first()
        )
        if db_nail_service:
            self.db.delete(db_nail_service)
            self.db.commit()
            return True
        return False
