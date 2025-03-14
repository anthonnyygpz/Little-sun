from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from src.models.user import User
from src.schemas.client import ClientCreate, ClientResponse, ClientUpdate
from src.services.client_service import ClientService

from src.api import dependencies
from .dependencies import get_client_service

router = APIRouter()


@router.post("/", response_model=ClientResponse, status_code=status.HTTP_201_CREATED)
async def create(
    client_in: ClientCreate,
    client_service: ClientService = Depends(get_client_service),
    current_user: User = Depends(dependencies.get_current_user),
):
    return await client_service.create_client(client_in=client_in)


@router.get("/", response_model=list[ClientResponse])
async def get_clients(
    skip: int = 0,
    limit: int = 100,
    client_service: ClientService = Depends(get_client_service),
    current_user: User = Depends(dependencies.get_current_user),
):
    return await client_service.get_clients(skip=skip, limit=limit)


@router.get("/by-name", response_model=ClientResponse)
async def get_by_name(
    client_name: str,
    client_service: ClientService = Depends(get_client_service),
    current_user: User = Depends(dependencies.get_current_user),
):
    client = await client_service.get_by_name(client_name=client_name)
    if not client:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Client not found"
        )
    return client


@router.put("/{client_id}", response_model=Optional[ClientResponse])
async def update_client(
    client_id: int,
    client_in: ClientUpdate,
    client_service: ClientService = Depends(get_client_service),
    current_user: User = Depends(dependencies.get_current_user),
):
    client = await client_service.update_client(client_id, client_in)
    if not client:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Client not found"
        )
    return client


@router.delete("/{client_id}")
async def delete(
    client_id: int,
    client_service: ClientService = Depends(get_client_service),
    current_user: User = Depends(dependencies.get_current_user),
):
    """
    Elimina un cliente por su ID
    """
    success = await client_service.delete_client(client_id=client_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="The client not found"
        )
    return success
