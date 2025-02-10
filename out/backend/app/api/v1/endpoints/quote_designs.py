from typing import Any
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api import deps
from app.crud.crud_quote_design import crud_quote_design
from app.schemas.quote_design import QuoteDesignCreate


router = APIRouter()


@router.post("/", response_model=QuoteDesignCreate)
def create(
    quote_design_in: QuoteDesignCreate,
    db: Session = Depends(deps.get_db),
) -> Any:
    return crud_quote_design.create(db, obj_in=quote_design_in)
