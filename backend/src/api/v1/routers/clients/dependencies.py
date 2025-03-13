from fastapi import Depends

from .....repositories.client_repository import ClientRepository
from .....services.client_service import ClientService
from .... import dependencies


def get_client_service(db=Depends(dependencies.get_db)):
    client_repo = ClientRepository(db)
    return ClientService(client_repo)
