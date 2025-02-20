from typing import Optional
from pydantic import BaseModel
from datetime import datetime


class ClientBase(BaseModel):
    name: str
    phone_number: Optional[int]


class ClientCreate(ClientBase):
    pass


class ClientUpdate(ClientBase):
    client_id: int


class ClientResponse(ClientBase):
    client_id: int
    created_at: datetime

    class Config:
        from_atributtes = True
