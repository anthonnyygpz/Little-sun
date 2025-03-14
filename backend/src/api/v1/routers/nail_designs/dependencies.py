from src.api import dependencies
from fastapi import Depends
from src.repositories.nail_design_repository import NailDesignRepository
from src.services.nail_design_service import NailDesignService


def get_nail_design_service(db=Depends(dependencies.get_db)):
    nail_design_repo = NailDesignRepository(db)
    return NailDesignService(nail_design_repo)
