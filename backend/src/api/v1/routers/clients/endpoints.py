from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from src.schemas.user import UserResponse
from src.schemas.client import ClientCreate, ClientResponse, ClientUpdate
from src.services.client_service import ClientService

from src.api import dependencies
from .dependencies import get_client_service

router = APIRouter()


@router.post("/", response_model=ClientResponse, status_code=status.HTTP_201_CREATED)
async def create(
    client_in: ClientCreate,
    client_service: ClientService = Depends(get_client_service),
    current_user: UserResponse = Depends(dependencies.get_current_user),
):
    """
    **name**: Es el nombre del cliente. *\n
    **phone_number**: Numero de telefono por donde se le contactara.
    """
    return await client_service.create_client(
        user_id=current_user.user_id, client_in=client_in
    )


@router.get("/", response_model=list[ClientResponse])
async def get_clients(
    skip: int = 0,
    limit: int = 100,
    client_service: ClientService = Depends(get_client_service),
    current_user: UserResponse = Depends(dependencies.get_current_user),
):
    """
    **skip**: Es por donde empezara el conteo de cada cliente (0 es el primer cliente).\n
    **limit**: Es por donde finaliza el conteo de cada cliente.
    """
    return await client_service.get_clients(
        user_id=current_user.user_id, skip=skip, limit=limit
    )


@router.get("/by-name/{client_name}", response_model=ClientResponse)
async def get_by_name(
    client_name: str,
    client_service: ClientService = Depends(get_client_service),
    current_user: UserResponse = Depends(dependencies.get_current_user),
):
    """
    **client_name**: Es el nombre por donde hace la busqueda del client. *
    """
    return await client_service.get_by_name(
        user_id=current_user.user_id, client_name=client_name
    )


@router.put("/", response_model=Optional[ClientResponse])
async def update_client(
    client_id: int,
    client_in: ClientUpdate,
    client_service: ClientService = Depends(get_client_service),
    current_user: UserResponse = Depends(dependencies.get_current_user),
):
    """
    **Para no actulizar los datos solo remueva el dato que no quiera modificar (solo el que tenga el simbolo '+' es obligatorio que tenga datos).**\n
    **client_id**: Es el id del cliente que sera actulizado. +\n
    **name**: El nuevo nombre del cliente.\n
    **phone_number**: El nuevo numero de telefono del cliente.
    """
    return await client_service.update_client(client_id, client_in)


@router.delete("/{client_id}")
async def delete(
    client_id: int,
    client_service: ClientService = Depends(get_client_service),
    current_user: UserResponse = Depends(dependencies.get_current_user),
):
    """
    **Elimina un cliente por su ID**
    """
    success = await client_service.delete_client(client_id=client_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="The client not found"
        )
    return success
