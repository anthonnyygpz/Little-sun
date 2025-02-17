from typing import Any
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from api import deps
from crud.crud_quote_service import crud_quote_service
from schemas.quote_service import QuoteServiceCreate


router = APIRouter()


@router.post("/", response_model=QuoteServiceCreate)
def create(
    quote_service_in: QuoteServiceCreate,
    db: Session = Depends(deps.get_db),
) -> Any:
    return crud_quote_service.create(db, obj_in=quote_service_in)


@router.get("/all")
def get_all(id: int, db: Session = Depends(deps.get_db)):
    return crud_quote_service.gets(db, id=id)


@router.delete("/delete")
def delete(quote_id: int, db: Session = Depends(deps.get_db)) -> Any:
    return crud_quote_service.delete(db, id=quote_id)
