from pydantic import BaseModel


class UserBase(BaseModel):
    username: str
    password_hashed: str


class UserCreate(UserBase):
    pass


class UserUpdate(UserBase):
    user_id: int


class UserResponse(UserBase):
    user_id: int
    created_at: str

    class Config:
        from_atributtes = True
