from fastapi import Depends
from src.repositories.appointment_design_repository import AppointmentDesignRepository
from src.repositories.appointment_repository import AppointmentRepository
from src.repositories.appointment_service_repository import (
    AppointmentServiceRepository,
)
from src.repositories.client_repository import ClientRepository
from src.repositories.nail_design_repository import NailDesignRepository
from src.repositories.nail_service_repository import NailServiceRepository
from src.repositories.sculping_nail_size_repository import SculpingNailSizeRepository
from src.services.appointment_service import AppointmentService

from .... import dependencies


def get_appointment_service(db=Depends(dependencies.get_db)):
    appointment_repo = AppointmentRepository(db)
    appointment_design_repo = AppointmentDesignRepository(db)
    appointment_service_repo = AppointmentServiceRepository(db)
    client_repo = ClientRepository(db)
    sculping_nail_size_repo = SculpingNailSizeRepository(db)
    nail_design_repo = NailDesignRepository(db)
    nail_service_repo = NailServiceRepository(db)

    return AppointmentService(
        client_repo=client_repo,
        appointment_repo=appointment_repo,
        appointment_design_repo=appointment_design_repo,
        sculping_nail_size_repo=sculping_nail_size_repo,
        appointment_service_repo=appointment_service_repo,
        nail_service_repo=nail_service_repo,
        nail_design_repo=nail_design_repo,
    )
