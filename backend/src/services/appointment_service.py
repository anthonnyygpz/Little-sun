from dataclasses import dataclass
from typing import List

from fastapi import HTTPException, status

from src.models.appointment_service import AppointmentService as AppointmentNailService
from src.models.appointment_design import AppointmentDesign
from src.models.appointment import Appointment
from src.models.client import Client
from src.repositories.interfaces import (
    IAppointmentDeisngRepository,
    IAppointmentRepository,
    IAppointmentServiceRepository,
    IClientRepository,
    INailDesignRepository,
    INailServiceRepository,
    ISculpingNailSizeRepository,
)
from src.schemas.appointment import (
    AppointmentFullCreate,
    AppointmentFullUpdate,
    AppointmentResponse,
)
from src.schemas.appointment_design import AppointmenDesigntCreate
from src.schemas.appointment_service import AppointmentServiceCreate


@dataclass()
class AppointmentService:
    client_repo: IClientRepository
    appointment_repo: IAppointmentRepository
    appointment_design_repo: IAppointmentDeisngRepository
    appointment_service_repo: IAppointmentServiceRepository
    sculping_nail_size_repo: ISculpingNailSizeRepository
    nail_service_repo: INailServiceRepository
    nail_design_repo: INailDesignRepository

    def _format_appointment(self, row: AppointmentResponse) -> AppointmentResponse:
        """Formatea los resultados de la base de datos"""
        return AppointmentResponse(
            appointment_id=row.appointment_id,
            user_id=row.user_id,
            client_id=row.client_id,
            client_name=row.client_name.title() if row.client_name else "",
            phone_number=row.phone_number or "",
            size_name=row.size_name or "",
            nail_size_id=row.nail_size_id or 0,
            nail_services=row.nail_services or "",
            nail_designs=row.nail_designs or "",
            status=row.status,
            created_at=row.created_at,
            total_amount=round(float(row.total_amount), 2),
        )

    async def create_full_appointment(
        self, user_id: int, appointment_in: AppointmentFullCreate
    ):
        client_id: int = 0
        appointment_id: int = 0

        try:
            get_client_if_exists = await self.client_repo.get_client_by_name(
                name=appointment_in.client_name, user_id=user_id
            )
            if get_client_if_exists:
                client_id = get_client_if_exists.client_id  # type: ignore
            else:
                try:
                    new_client = await self.client_repo.create_client(
                        user_id=user_id,
                        client_in=Client(
                            name=appointment_in.client_name,
                            phone_number=appointment_in.phone_number,
                            user_id=user_id,
                        ),
                    )
                    client_id = new_client.client_id
                except Exception as e:
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST, detail=str(e)
                    )
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

        try:
            create_appointment = await self.appointment_repo.create_appointment(
                user_id=user_id,
                appointment_in=Appointment(
                    client_id=client_id,
                    user_id=user_id,
                    nail_size_id=appointment_in.nail_size_id,
                    date_appointment=appointment_in.date_appointment,
                    appointment_time=appointment_in.appointment_time,
                ),
            )

            appointment_id = create_appointment.appointment_id
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
        try:
            if appointment_in.nail_designs:
                for id in appointment_in.nail_designs:
                    if id != 0:
                        await self.appointment_design_repo.create_appointment_design(
                            appointment_in=AppointmentDesign(
                                appointment_id=appointment_id, design_id=id
                            )
                        )
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

        try:
            if appointment_in.nail_services:
                for id in appointment_in.nail_services:
                    if id != 0:
                        await self.appointment_service_repo.create_appointment_service(
                            appointment_in=AppointmentNailService(
                                appointment_id=appointment_id, service_id=id
                            )
                        )
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
        return {"detail": "Appointment create successfully"}

    async def get_all_appointments(self, user_id: int) -> List[AppointmentResponse]:
        """Obtiene y formatea las citas con el total consolidado"""
        try:
            appointments = await self.appointment_repo.get_all_appointments(user_id)
            return [self._format_appointment(row) for row in appointments]  # type: ignore
        except Exception as e:
            raise RuntimeError(f"Error de servicio: {str(e)}")

    async def update_appointment(self, appointment_in: AppointmentFullUpdate):
        return await self.appointment_repo.update_appointment(appointment_in)

    async def delete_nail_size_id(self, appointment_id: int) -> bool:
        return await self.appointment_repo.delete_nail_size_id(appointment_id)

    async def delete_appointment(self, appointment_id: int) -> bool:
        return await self.appointment_repo.delete_appointment(appointment_id)
