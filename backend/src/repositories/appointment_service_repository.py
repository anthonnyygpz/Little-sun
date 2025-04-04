from dataclasses import dataclass
from typing import List

from sqlalchemy.orm import Session
from src.models.appointment_service import AppointmentService
from src.schemas.appointment_service import AppointmentServiceCreate

from .interfaces import IAppointmentServiceRepository


@dataclass
class AppointmentServiceRepository(IAppointmentServiceRepository):
    db: Session

    async def create_appointment_service(
        self, appointment_in: AppointmentServiceCreate
    ) -> AppointmentService:
        db_appointment_service = AppointmentService(
            appointment_id=appointment_in.appointment_id,
            service_id=appointment_in.service_id,
        )

        self.db.add(db_appointment_service)
        self.db.commit()
        self.db.refresh(db_appointment_service)
        return db_appointment_service

    async def get_all_appointment_by_id(
        self, appointment_id: int
    ) -> List[AppointmentService]:
        return (
            self.db.query(AppointmentService)
            .filter_by(appointment_id=appointment_id)
            .all()
        )
