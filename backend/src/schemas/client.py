from typing import Optional
from pydantic import BaseModel, Field
from datetime import datetime


class ClientBase(BaseModel):
    name: str = Field(..., max_length=100)
    phone_number: Optional[str] = Field(None)


class ClientCreate(ClientBase):
    pass


class ClientUpdate(BaseModel):
    name: str | None = None
    phone_number: str | None = None
    # user_id: int


class ClientResponse(ClientBase):
    client_id: int
    user_id: int
    created_at: datetime

    class Config:
        from_atributtes = True
