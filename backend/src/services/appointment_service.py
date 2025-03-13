from dataclasses import dataclass
from typing import List

from ..repositories.interfaces import (
    IAppointmentDeisngRepository,
    IAppointmentRepository,
    IAppointmentServiceRepository,
    IClientRepository,
    INailDesignRepository,
    INailServiceRepository,
    ISculpingNailSizeRepository,
)
from ..schemas.appointment import (
    AppointmenDesigntCreate,
    Appointment,
    AppointmentCreate,
    AppointmentFullUpdate,
    AppointmentResponse,
    AppointmentServiceCreate,
)
from ..schemas.client import ClientCreate


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

    async def create_full_appointment(self, appointment_in: Appointment):
        client_id: int = 0
        appointment_id: int = 0

        get_client_if_exists = await self.client_repo.get_client_by_name(
            name=appointment_in.client_name
        )
        if get_client_if_exists:
            client_id = get_client_if_exists.client_id  # type: ignore
        else:
            new_client = await self.client_repo.create_client(
                client_in=ClientCreate(
                    name=appointment_in.client_name,
                    phone_number=appointment_in.phone_number,
                )
            )
            client_id = new_client.client_id  # type:ignore

        create_appointment = await self.appointment_repo.create_appointment(
            appointment_in=AppointmentCreate(
                client_id=client_id,
                nail_size_id=appointment_in.nail_size_id,
            )
        )
        appointment_id = create_appointment.appointment_id  # type: ignore
        if appointment_in.designs:
            for id in appointment_in.designs:
                if id != 0:
                    await self.appointment_design_repo.create_appointment_design(
                        appointment_in=AppointmenDesigntCreate(
                            appointment_id=appointment_id, design_id=id
                        )
                    )

        if appointment_in.services:
            for id in appointment_in.services:
                if id != 0:
                    await self.appointment_service_repo.create_appointment_service(
                        appointment_in=AppointmentServiceCreate(
                            appointment_id=appointment_id, service_id=id
                        )
                    )
        return {"detail": "Appointment create successfully"}

    async def get_all_appointments(self) -> List[AppointmentResponse]:
        """Obtiene y formatea las citas con el total consolidado"""
        try:
            appointments = await self.appointment_repo.get_all_appointments()
            return [self._format_appointment(row) for row in appointments]  # type: ignore
        except Exception as e:
            raise RuntimeError(f"Error de servicio: {str(e)}")

    async def update_appointment(self, appointment_in: AppointmentFullUpdate):
        return await self.appointment_repo.update_appointment(appointment_in)

    async def delete_nail_size_id(self, appointment_id: int) -> bool:
        return await self.appointment_repo.delete_nail_size_id(appointment_id)

    async def delete_appointment(self, appointment_id: int) -> bool:
        return await self.appointment_repo.delete_appointment(appointment_id)
