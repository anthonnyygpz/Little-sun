from pydantic import BaseModel


class NailDesignBase(BaseModel):
    design_name: str
    base_price: int


class NailDesignCreate(NailDesignBase):
    pass


class NailDesignUpdate(BaseModel):
    design_name: str | None = None
    base_price: int | None = None
    user_id: int


class NailDesignResponse(NailDesignBase):
    design_id: int

    class Config:
        from_atributtes = True
