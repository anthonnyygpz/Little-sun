from typing import Any, List

from api import deps
from crud.crud_service import crud_service
from schemas.service import (
    ServiceCreate,
    ServiceResponse,
    ServiceUpdate,
)
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

router = APIRouter()


@router.post("/create", response_model=ServiceResponse)
def create(service_in: ServiceCreate, db: Session = Depends(deps.get_db)) -> Any:
    service = crud_service.get_by_name(db, name_in=service_in.service_name)
    if service:
        raise HTTPException(status_code=404, detail="The Service not found")
    service = crud_service.create(db, obj_in=service_in)
    return service


@router.get("/all", response_model=List[ServiceResponse])
def get_all(db: Session = Depends(deps.get_db)) -> Any:
    service = crud_service.get_all(db)
    if not service:
        raise HTTPException(status_code=404, detail="The Service not found")
    return service


@router.put("/update", response_model=ServiceResponse)
def update(service_in: ServiceUpdate, db: Session = Depends(deps.get_db)) -> Any:
    sculping_size = crud_service.get_by_id(db, service_id=service_in.service_id)
    if not sculping_size:
        raise HTTPException(status_code=404, detail="The Service not found")
    sculping_size = crud_service.update(db, obj_in=service_in)
    return sculping_size


@router.delete("/delete")
def delete(service_id: int, db: Session = Depends(deps.get_db)) -> Any:
    service = crud_service.get_by_id(db, service_id=service_id)
    if not service:
        raise HTTPException(status_code=404, detail="The Service not found")
    service = crud_service.delete(db, service_id=service_id)
    return service
