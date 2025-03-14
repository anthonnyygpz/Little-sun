from src.db.base import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship


class SculpingNailSize(Base):
    __tablename__ = "sculping_nail_sizes"

    size_id = Column(Integer, primary_key=True, autoincrement=True)
    size_name = Column(String, nullable=False)
    base_price = Column(Integer, nullable=False)

    appointment = relationship("Appointment", back_populates="sculping_size")
