from dataclasses import dataclass
from typing import List

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from src.models.appointment import Appointment
from src.models.appointment_design import AppointmentDesign
from src.models.appointment_service import AppointmentService
from src.models.client import Client
from src.models.nail_design import NailDesign
from src.models.nail_service import NailService
from src.models.sculping_size import SculpingNailSize
from src.schemas.appointment import (
    AppointmentCreate,
    AppointmentFullUpdate,
    AppointmentResponse,
    AppointmentUpdate,
)
from src.schemas.client import ClientUpdate

from .interfaces import IAppointmentRepository


@dataclass()
class AppointmentRepository(IAppointmentRepository):
    db: Session

    async def create_appointment(self, appointment_in: AppointmentCreate):
        appointment_data = {}
        if appointment_in.client_id != 0:
            appointment_data["client_id"] = appointment_in.client_id
        if appointment_in.nail_size_id != 0:
            appointment_data["nail_size_id"] = appointment_in.nail_size_id

        db_appointment = Appointment(**appointment_data)
        self.db.add(db_appointment)
        self.db.commit()
        self.db.refresh(db_appointment)
        return db_appointment

    async def get_all_appointments(self) -> List[tuple]:
        try:
            # Subconsultas para calcular totales individuales
            services_total = (
                select(
                    AppointmentService.appointment_id,
                    func.sum(NailService.base_price).label("services_total"),
                )
                .join(NailService)
                .group_by(AppointmentService.appointment_id)
                .subquery()
            )

            designs_total = (
                select(
                    AppointmentDesign.appointment_id,
                    func.sum(NailDesign.base_price).label("designs_total"),
                )
                .join(NailDesign)
                .group_by(AppointmentDesign.appointment_id)
                .subquery()
            )

            query = (
                select(
                    Appointment.appointment_id,
                    Client.name.label("client_name"),
                    Client.phone_number,
                    Client.client_id,
                    SculpingNailSize.size_name,
                    Appointment.nail_size_id,
                    func.string_agg(NailService.service_name, ", ").label(
                        "nail_services"
                    ),
                    func.string_agg(NailDesign.design_name, ", ").label("nail_designs"),
                    Appointment.status,
                    Appointment.created_at,
                    (
                        func.coalesce(services_total.c.services_total, 0)
                        + func.coalesce(designs_total.c.designs_total, 0)
                        + func.coalesce(SculpingNailSize.base_price, 0)
                    ).label("total_amount"),
                )
                .select_from(Appointment)
                .outerjoin(Client, Appointment.client_id == Client.client_id)
                .outerjoin(
                    SculpingNailSize,
                    Appointment.nail_size_id == SculpingNailSize.size_id,
                )
                .outerjoin(
                    services_total,
                    services_total.c.appointment_id == Appointment.appointment_id,
                )
                .outerjoin(
                    designs_total,
                    designs_total.c.appointment_id == Appointment.appointment_id,
                )
                .outerjoin(AppointmentService)
                .outerjoin(NailService)
                .outerjoin(AppointmentDesign)
                .outerjoin(NailDesign)
                .group_by(
                    Appointment.appointment_id,
                    Client.client_id,
                    SculpingNailSize.size_id,
                    services_total.c.services_total,
                    designs_total.c.designs_total,
                    Appointment.status,
                    Appointment.created_at,
                )
                .order_by(Appointment.created_at.desc())
            )

            result = self.db.execute(query)
            return result.all()  # type: ignore
        except Exception as e:
            raise RuntimeError(f"Error de base de datos: {str(e)}")

    async def update_appointment(self, appointment_in: AppointmentFullUpdate):
        db_appointment = (
            self.db.query(Appointment)
            .filter_by(appointment_id=appointment_in.appointment_id)
            .first()
        )
        if db_appointment:
            update_data = AppointmentUpdate(
                client_id=appointment_in.client_id,
                nail_size_id=appointment_in.nail_size_id,
            ).model_dump(exclude_none=True)

            for key, value in update_data.items():
                setattr(db_appointment, key, value)
            self.db.commit()
            self.db.refresh(db_appointment)

        existing_designs = (
            self.db.query(Appointment)
            .filter_by(appointment_id=appointment_in.appointment_id)
            .all()
        )

        if appointment_in.nail_designs != []:
            if existing_designs:
                self.db.query(AppointmentDesign).filter_by(
                    appointment_id=appointment_in.appointment_id
                ).delete()
            for id in appointment_in.nail_designs:
                add_nail_designs = AppointmentDesign(
                    appointment_id=appointment_in.appointment_id, design_id=id
                )
                self.db.add(add_nail_designs)
                self.db.commit()
                self.db.refresh(add_nail_designs)

        existing_services = (
            self.db.query(Appointment)
            .filter_by(appointment_id=appointment_in.appointment_id)
            .all()
        )

        if appointment_in.nail_services != []:
            if existing_services:
                self.db.query(AppointmentService).filter_by(
                    appointment_id=appointment_in.appointment_id
                ).delete()
            for id in appointment_in.nail_services:
                add_nail_services = AppointmentService(
                    appointment_id=appointment_in.appointment_id, service_id=id
                )
                self.db.add(add_nail_services)
                self.db.commit()
                self.db.refresh(add_nail_services)

        db_client = (
            self.db.query(Client).filter_by(client_id=appointment_in.client_id).first()
        )
        if db_client:
            update_data = ClientUpdate(
                name=appointment_in.client_name,
                phone_number=appointment_in.phone_number,
            ).model_dump(exclude_unset=True)
            for key, value in update_data.items():
                setattr(db_client, key, value)
            self.db.commit()
            self.db.refresh(db_client)

        return True

    async def delete_nail_size_id(self, appointment_id: int) -> bool:
        db_appointment = (
            self.db.query(Appointment).filter_by(appointment_id=appointment_id).first()
        )
        if db_appointment:
            self.db.delete(db_appointment)
            self.db.commit()
            return True
        return False

    async def delete_appointment(self, appointment_id: int) -> bool:
        db_appointment = (
            self.db.query(Appointment).filter_by(appointment_id=appointment_id).first()
        )
        if db_appointment:
            self.db.delete(db_appointment)
            self.db.commit()
            return True
        return False
