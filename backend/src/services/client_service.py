from dataclasses import dataclass
from typing import List, Optional

from fastapi import HTTPException, status
from src.repositories.interfaces import IClientRepository
from src.schemas.client import ClientCreate, ClientResponse, ClientUpdate


@dataclass
class ClientService:
    client_repo: IClientRepository

    async def create_client(
        self, user_id: int, client_in: ClientCreate
    ) -> ClientResponse:
        return await self.client_repo.create_client(
            user_id=user_id, client_in=client_in
        )

    async def get_clients(
        self, user_id: int, skip: int = 0, limit: int = 100
    ) -> List[ClientResponse]:
        return await self.client_repo.get_client_all(
            user_id=user_id, skip=skip, limit=limit
        )

    async def get_by_name(
        self, user_id: int, client_name: str
    ) -> Optional[ClientResponse]:
        client = await self.client_repo.get_client_by_name(
            user_id=user_id, name=client_name
        )

        if not client:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Client not found"
            )
        return client

    async def update_client(
        self, client_id: int, client_in: ClientUpdate
    ) -> Optional[ClientResponse]:
        client = await self.client_repo.update_client(
            client_id=client_id, client_in=client_in
        )
        if not client:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Client not found"
            )
        return client

    async def delete_client(self, client_id: int) -> bool:
        return await self.client_repo.delete_client(client_id)
