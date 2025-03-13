from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserCreate(UserBase):
    pass


class UserUpdate(UserBase):
    user_id: int


class UserResponse(UserBase):
    user_id: int
    created_at: str

    class Config:
        from_atributtes = True
