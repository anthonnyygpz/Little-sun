from fastapi import Depends

from .....repositories.nail_design_repository import NailDesignRepository
from .....services.nail_design_service import NailDesignService
from .... import dependencies


def get_nail_design_service(db=Depends(dependencies.get_db)):
    nail_design_repo = NailDesignRepository(db)
    return NailDesignService(nail_design_repo)
