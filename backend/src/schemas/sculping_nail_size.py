from pydantic import BaseModel


class SculpingNailSizeBase(BaseModel):
    size_name: str
    base_price: int
    user_id: int


class SculpingNailSizeCreate(SculpingNailSizeBase):
    pass


class SculpingNailSizeUpdate(SculpingNailSizeBase):
    pass


class SculpingNailSizeResponse(SculpingNailSizeBase):
    size_id: int

    class Config:
        from_atributtes = True
