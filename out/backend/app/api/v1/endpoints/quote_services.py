from typing import Any
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api import deps
from app.crud.crud_quote_service import crud_quote_service
from app.schemas.quote_service import QuoteServiceCreate


router = APIRouter()


@router.post("/", response_model=QuoteServiceCreate)
def create(
    quote_service_in: QuoteServiceCreate,
    db: Session = Depends(deps.get_db),
) -> Any:
    return crud_quote_service.create(db, obj_in=quote_service_in)
