from dataclasses import dataclass
from typing import List, Optional

from src.models.client import Client
from src.repositories.interfaces import IClientRepository
from src.schemas.client import ClientCreate, ClientUpdate


@dataclass
class ClientService:
    client_repo: IClientRepository

    async def create_client(self, client_in: ClientCreate) -> Client:
        return await self.client_repo.create_client(client_in)

    async def get_clients(self, skip: int = 0, limit: int = 100) -> List[Client]:
        return await self.client_repo.get_client_all(skip=skip, limit=limit)

    async def get_by_name(self, client_name: str) -> Optional[Client]:
        return await self.client_repo.get_client_by_name(name=client_name)

    async def update_client(
        self, client_id: int, client_in: ClientUpdate
    ) -> Optional[Client]:
        return await self.client_repo.update_client(
            client_id=client_id, client_in=client_in
        )

    async def delete_client(self, client_id: int) -> bool:
        return await self.client_repo.delete_client(client_id)
