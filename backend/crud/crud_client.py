from typing import Optional

from models.client import Client
from schemas.client import ClientCreate, ClientUpdate
from fastapi import HTTPException
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session


class CRUDClient:
    def create(self, db: Session, *, obj_in: ClientCreate) -> Client:
        try:
            obj_db = Client(
                name=obj_in.name.lower(),  # type: ignore
                phone_number=obj_in.phone_number,
            )
            db.add(obj_db)
            db.commit()
            db.refresh(obj_db)
            return obj_db
        except SQLAlchemyError as he:
            db.rollback()
            raise HTTPException(status_code=400, detail=str(he))
        except Exception as e:
            db.rollback()
            raise HTTPException(status_code=404, detail=str(e))

    def get_by_name(self, db: Session, *, name: str) -> Optional[Client]:
        return db.query(Client).filter_by(name=name).first()

    def get_all(self, db: Session):
        obj_db = db.query(Client).all()
        return obj_db

    def update(self, db: Session, *, obj_in: ClientUpdate):
        obj_client = {}
        if obj_in.name != "":
            obj_client["name"] = obj_in.name
        if obj_in.phone_number != 0:
            obj_client["phone_number"] = obj_in.phone_number
        if obj_client:
            db.query(Client).filter_by(client_id=obj_in.client_id).update(obj_client)
            db.commit()
        return {"message": "Cliente actualizado"}

    def delete(self, db: Session, *, id: int):
        obj_db = db.query(Client).filter_by(client_id=id).delete()
        db.commit()
        db.close()
        return obj_db


crud_client = CRUDClient()
