from dataclasses import dataclass
from typing import List, Optional

from fastapi import HTTPException, status
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session
from src.models.client import Client
from src.schemas.client import ClientCreate, ClientUpdate

from .interfaces import IClientRepository


@dataclass
class ClientRepository(IClientRepository):
    db: Session

    async def create_client(self, client_in: ClientCreate) -> Client:
        try:
            db_client = Client(
                name=client_in.name.lower(),
                phone_number=client_in.phone_number,
            )
            self.db.add(db_client)
            self.db.commit()
            self.db.refresh(db_client)
            return db_client
        except SQLAlchemyError as he:
            self.db.rollback()
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(he))
        except Exception as e:
            self.db.rollback()
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))

    async def get_client_all(self, skip: int = 0, limit: int = 100) -> List[Client]:
        return self.db.query(Client).offset(skip).limit(limit).all()

    async def get_client_by_name(self, name: str) -> Optional[Client]:
        return self.db.query(Client).filter_by(name=name.lower()).first()

    async def update_client(
        self, client_id: int, client_in: ClientUpdate
    ) -> Optional[Client]:
        db_client = self.db.query(Client).filter_by(client_id=client_id).first()
        if db_client:
            update_data = client_in.model_dump(exclude_unset=True)
            for key, value in update_data.items():
                setattr(db_client, key, value)
            self.db.commit()
            self.db.refresh(db_client)
        return db_client

    async def delete_client(self, client_id: int) -> bool:
        db_client = self.db.query(Client).filter_by(client_id=client_id).first()
        if db_client:
            self.db.delete(db_client)
            self.db.commit()
            return True
        return False
