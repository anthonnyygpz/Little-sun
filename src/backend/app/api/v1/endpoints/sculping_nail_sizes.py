from typing import Any, List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api import deps
from app.crud.crud_sculping_size import crud_sculping_size
from app.schemas.sculping_nail_size import (
    SculpingSizeCreate,
    SculpingSizeResponse,
    SculpingSizeUpdate,
)
from fastapi import HTTPException


router = APIRouter()


@router.post("/", response_model=SculpingSizeResponse)
def create(
    sculping_size_in: SculpingSizeCreate, db: Session = Depends(deps.get_db)
) -> Any:
    sculping_size = crud_sculping_size.get_by_name(
        db, name_in=sculping_size_in.size_name
    )
    if sculping_size:
        raise HTTPException(status_code=404, detail="The sculping size not found")
    sculping_size = crud_sculping_size.create(db, obj_in=sculping_size_in)
    return sculping_size


@router.get("/all", response_model=List[SculpingSizeResponse])
def get_all(db: Session = Depends(deps.get_db)) -> Any:
    sculping_size = crud_sculping_size.get_all(db)
    if not sculping_size:
        raise HTTPException(status_code=404, detail="The Service not found")
    return sculping_size


@router.get("/get_by_id", response_model=SculpingSizeResponse)
def get(id: int, db: Session = Depends(deps.get_db)) -> Any:
    return crud_sculping_size.get_by_id(db, id=id)


@router.put("/{size_id}")
def update(
    sculping_size_in: SculpingSizeUpdate, db: Session = Depends(deps.get_db)
) -> Any:
    sculping_size = crud_sculping_size.update(db, obj_in=sculping_size_in)
    if not sculping_size:
        raise HTTPException(status_code=404, detail="The sculping size not found")
    return sculping_size


@router.delete("/{size_id]")
def delete(sculping_size_id: int, db: Session = Depends(deps.get_db)) -> Any:
    sculping_size = crud_sculping_size.delete(db, id=sculping_size_id)
    if not sculping_size:
        raise HTTPException(status_code=404, detail="The sculping size not found")
    return sculping_size
