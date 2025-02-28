from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from api import deps

router = APIRouter()


@router.post("/create")
def create(db: Session = Depends(deps.get_db)):
    return


@router.get("/get")
def get(db: Session = Depends(deps.get_db)):
    return


@router.put("/update")
def update(db: Session = Depends(deps.get_db)):
    return


@router.delete("/delete")
def delete(db: Session = Depends(deps.get_db)):
    return
