from db.base import Base
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, func
from sqlalchemy.orm import relationship


class Quote(Base):
    __tablename__ = "quotes"

    quote_id = Column(Integer, primary_key=True, autoincrement=True)
    client_id = Column(Integer, ForeignKey("clients.client_id"))
    nail_size_id = Column(
        Integer, ForeignKey("sculping_nail_sizes.size_id"), nullable=True
    )
    created_at = Column(DateTime(timezone=True), nullable=False, default=func.now())
    status = Column(String, default="Pending")

    services = relationship(
        "Service", secondary="quote_services", back_populates="quotes"
    )
    designs = relationship("Design", secondary="quote_designs", back_populates="quotes")
    client = relationship("Client", back_populates="quote")
    sculping_sizes = relationship("SculpingNailSize", back_populates="quotes")
