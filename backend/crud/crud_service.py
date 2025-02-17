from typing import Dict, List, Optional
from sqlalchemy.orm import Session
from sqlalchemy.exc import DataError, IntegrityError, SQLAlchemyError
from fastapi import HTTPException

from models.service import Service
from schemas.service import ServiceCreate, ServiceUpdate


class CRUDService:
    def create(self, db: Session, *, obj_in: ServiceCreate) -> Service:
        try:
            obj_db = Service(
                service_name=obj_in.service_name,
                description=obj_in.description,
                price=obj_in.price,
            )
            db.add(obj_db)
            db.commit()
            db.refresh(obj_db)
            return obj_db
        except IntegrityError as ie:
            db.rollback()
            raise HTTPException(status_code=400, detail=f"Integratiy error: {str(ie)}")
        except DataError as de:
            db.rollback()
            raise HTTPException(status_code=400, detail=str(de))
        except Exception as e:
            db.rollback()
            raise HTTPException(status_code=404, detail=str(e))

    def get_all(self, db: Session) -> Optional[List[Service]]:
        service = db.query(Service).all()
        return service if service else []

    def get_by_name(self, db: Session, *, name_in: str) -> Optional[Service]:
        return db.query(Service).filter_by(service_name=name_in).first()

    def get_by_id(self, db: Session, *, service_id: int) -> Optional[Service]:
        return db.query(Service).filter_by(service_id=service_id).first()

    def update(self, db: Session, *, obj_in: ServiceUpdate) -> Optional[Service]:
        service = self.get_by_id(db, service_id=obj_in.service_id)
        update_data: Dict = {
            k: v for k, v in obj_in.model_dump().items() if v not in ("", 0)
        }
        if update_data:
            db.query(Service).filter_by(service_id=obj_in.service_id).update(
                update_data
            )
            db.commit()
            db.refresh(service)
            return service
        return None

    def delete(self, db: Session, *, service_id: int):
        db.query(Service).filter_by(service_id=service_id).delete()
        db.commit()
        return {"message": "Service deleted successfully"}


crud_service = CRUDService()
