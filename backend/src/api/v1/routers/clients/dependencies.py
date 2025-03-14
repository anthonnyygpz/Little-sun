from fastapi import Depends
from src.api import dependencies
from src.repositories.client_repository import ClientRepository
from src.services.client_service import ClientService


def get_client_service(db=Depends(dependencies.get_db)):
    client_repo = ClientRepository(db)
    return ClientService(client_repo)
