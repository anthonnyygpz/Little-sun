from src.db.base import Base
from sqlalchemy import Column, DateTime, Integer, String
from sqlalchemy.sql import func


class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String, nullable=False, unique=True)
    username = Column(String, nullable=False, unique=True)
    password_hashed = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), nullable=True, default=func.now())
