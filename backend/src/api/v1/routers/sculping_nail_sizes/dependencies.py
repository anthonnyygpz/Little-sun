from fastapi import Depends

from src.api import dependencies
from src.repositories.sculping_nail_size_repository import SculpingNailSizeRepository
from src.services.sculping_nail_size_service import SculpingNailSizeService


def get_sculping_nail_size_service(db=Depends(dependencies.get_db)):
    sculping_nail_size_repo = SculpingNailSizeRepository(db)
    return SculpingNailSizeService(sculping_nail_size_repo=sculping_nail_size_repo)
