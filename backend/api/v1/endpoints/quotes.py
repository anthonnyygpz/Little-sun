from typing import Any

from api import deps
from crud.crud_quote import crud_quote
from schemas.quote import (
    QuoteCreate,
    QuoteUpdate,
)
from services.quote import service_quote
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

router = APIRouter()


@router.post("/create")
def create(quote_in: QuoteCreate, db: Session = Depends(deps.get_db)):
    return crud_quote.create(db, obj_in=quote_in)


@router.get("/all")
def gets(db: Session = Depends(deps.get_db)) -> Any:
    return crud_quote.get_all(db)


@router.get("/test", response_model=None)
def test(db: Session = Depends(deps.get_db)) -> Any:
    return service_quote.total_amount(db, quote_id=118, size_id=1)


@router.put("/update")
def update(quote_in: QuoteUpdate, db: Session = Depends(deps.get_db)) -> Any:
    return crud_quote.update(db, obj_in=quote_in)


@router.put("/delete_sculping")
def delete_sculping_nail_size(quote_id: int, db: Session = Depends(deps.get_db)) -> Any:
    return crud_quote.delete_sculping_nail_size(db, id=quote_id)


@router.delete("/delete")
def delete(quote_id: int, db: Session = Depends(deps.get_db)) -> Any:
    return crud_quote.delete(db, id=quote_id)
