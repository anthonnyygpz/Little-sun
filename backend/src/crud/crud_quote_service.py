from typing import Optional
from models.service import Service
from sqlalchemy.orm import Session

from models.quote_service import QuoteService
from schemas.quote_service import QuoteServiceCreate, QuoteServiceResponse


class CRUDQuoteService:
    def create(self, db: Session, *, obj_in: QuoteServiceCreate):
        obj_db = QuoteService(quote_id=obj_in.quote_id, service_id=obj_in.service_id)
        db.add(obj_db)
        db.commit()
        db.refresh(obj_db)
        return obj_db

    def get_by_id(self, db: Session, *, id: int):
        return db.query(QuoteService).filter_by(quote_id=id).all()

    def get_all(self, db: Session) -> Optional[QuoteServiceResponse]:
        obj_quote_service = db.query(QuoteService).all()
        return obj_quote_service  # type:ignore

    def delete(self, db: Session, *, id: int):
        obj_db = db.query(QuoteService).filter_by(quote_id=id).delete()
        db.commit()
        return obj_db


crud_quote_service = CRUDQuoteService()
