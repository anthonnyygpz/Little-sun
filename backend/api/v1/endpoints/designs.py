from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from api import deps
from crud.crud_design import crud_design
from schemas.design import (
    DesignCreate,
    DesignResponse,
    DesignUpdate,
)

router = APIRouter()


@router.post("/create", response_model=DesignResponse)
def create(design_in: DesignCreate, db: Session = Depends(deps.get_db)) -> Any:
    design = crud_design.get_by_name(db, name_in=design_in.design_name)
    if design:
        raise HTTPException(status_code=404, detail="The design not found")
    design = crud_design.create(db, obj_in=design_in)
    return design


@router.get("/all", response_model=list[DesignResponse])
def get_all(db: Session = Depends(deps.get_db)) -> Any:
    design = crud_design.get_all(db)
    if not design:
        raise HTTPException(status_code=404, detail="The design not found")
    return design


@router.put("/update")
def update(design_in: DesignUpdate, db: Session = Depends(deps.get_db)) -> Any:
    design = crud_design.get_by_id(db, design_id=design_in.design_id)
    if not design:
        raise HTTPException(status_code=404, detail="The design not found")
    design = crud_design.update(db, obj_in=design_in)
    return design


@router.delete("/delete")
def delete(design_id: int, db: Session = Depends(deps.get_db)) -> Any:
    design = crud_design.get_by_id(db, design_id=design_id)
    if not design:
        raise HTTPException(status_code=404, detail="The design not found")
    design = crud_design.delete(db, design_id=design_id)
    return design
