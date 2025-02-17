from typing import Any
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from api import deps
from crud.crud_quote_design import crud_quote_design
from schemas.quote_design import QuoteDesignCreate


router = APIRouter()


@router.post("/", response_model=QuoteDesignCreate)
def create(
    quote_design_in: QuoteDesignCreate,
    db: Session = Depends(deps.get_db),
) -> Any:
    return crud_quote_design.create(db, obj_in=quote_design_in)


@router.delete("/delete")
def delete(quote_id: int, db: Session = Depends(deps.get_db)) -> Any:
    return crud_quote_design.delete(db, id=quote_id)
