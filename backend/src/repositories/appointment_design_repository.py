from dataclasses import dataclass
from typing import List
from sqlalchemy.orm import Session

from src.models.appointment_design import AppointmentDesign

from .interfaces import IAppointmentDeisngRepository
from ..schemas.appointment import AppointmenDesigntCreate


@dataclass
class AppointmentDesignRepository(IAppointmentDeisngRepository):
    db: Session

    async def create_appointment_design(
        self, appointment_in: AppointmenDesigntCreate
    ) -> AppointmentDesign:
        db_appointment_design = AppointmentDesign(
            quote_id=appointment_in.appointment_id, design_id=appointment_in.design_id
        )
        self.db.add(db_appointment_design)
        self.db.commit()
        self.db.refresh(db_appointment_design)
        return db_appointment_design

    async def get_all_appointment_by_id(
        self, appointment_id: int
    ) -> List[AppointmentDesign]:
        return (
            self.db.query(AppointmentDesign)
            .filter_by(appointment_id=appointment_id)
            .all()
        )
