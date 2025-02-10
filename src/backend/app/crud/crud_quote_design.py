from typing import Optional
from sqlalchemy.orm import Session

from app.models.quote_design import QuoteDesign
from app.schemas.quote_design import QuoteDesignCreate


class CRUDQuoteDesign:
    def create(self, db: Session, *, obj_in: QuoteDesignCreate):
        obj_db = QuoteDesign(quote_id=obj_in.quote_id, design_id=obj_in.design_id)
        db.add(obj_db)
        db.commit()
        db.refresh(obj_db)
        return obj_db

    def get_by_id(self, db: Session, *, id: int):
        return db.query(QuoteDesign).filter_by(quote_id=id).all()

    def get_all(self, db: Session) -> Optional[QuoteDesign]:
        obj_quote_design = db.query(QuoteDesign).all()
        return obj_quote_design  # type: ignore

    def delete(self, db: Session, *, id: int):
        obj_db = db.query(QuoteDesign).filter_by(quote_id=id).delete()
        db.commit()
        return obj_db


crud_quote_design = CRUDQuoteDesign()
