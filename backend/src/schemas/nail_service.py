from typing import Optional
from pydantic import BaseModel


class NailServiceBase(BaseModel):
    service_name: str
    base_price: int


class NailServiceCreate(NailServiceBase):
    pass


class NailServiceUpdate(NailServiceBase):
    service_id: int


class NailServiceResponse(NailServiceBase):
    service_id: int

    class Config:
        from_atributtes = True
