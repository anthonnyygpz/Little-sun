from typing import Any

from api import deps
from crud.crud_client import crud_client
from fastapi import APIRouter, Depends, HTTPException
from schemas.client import (
    ClientCreate,
    ClientResponse,
    ClientUpdate,
)
from sqlalchemy.orm import Session

router = APIRouter()


@router.post("/", response_model=ClientResponse)
def create(client_in: ClientCreate, db: Session = Depends(deps.get_db)) -> Any:
    client = crud_client.get_by_name(db, name=client_in.name)  # type: ignore
    if client:
        raise HTTPException(
            status_code=400, detail="The client with this name already exits."
        )
    client = crud_client.create(db, obj_in=client_in)
    return client


@router.get("/all", response_model=list[ClientResponse])
def get_all(db: Session = Depends(deps.get_db)) -> Any:
    client = crud_client.get_all(db)
    if not client:
        raise HTTPException(status_code=404, detail="The Client not found")
    return client


@router.get("/", response_model=ClientResponse)
def get_by_name(name_in: str, db: Session = Depends(deps.get_db)) -> Any:
    client = crud_client.get_by_name(db, name=name_in)
    if not client:
        raise HTTPException(status_code=404, detail="The Client not found")
    return client


@router.put("/update", response_model=None)
def update(client_in: ClientUpdate, db: Session = Depends(deps.get_db)) -> Any:
    return crud_client.update(db, obj_in=client_in)


@router.delete("/delete")
def delete(client_id: int, db: Session = Depends(deps.get_db)):
    client = crud_client.delete(db, id=client_id)
    if not client:
        raise HTTPException(status_code=404, detail="The client not found")
    return client
