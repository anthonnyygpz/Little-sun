from fastapi import Depends

from src.api import dependencies
from src.repositories.nail_service_repository import NailServiceRepository
from src.services.nail_service_service import NailServiceService


def get_nail_service_service(db=Depends(dependencies.get_db)):
    nail_service_repo = NailServiceRepository(db)
    return NailServiceService(nail_service_repo=nail_service_repo)
