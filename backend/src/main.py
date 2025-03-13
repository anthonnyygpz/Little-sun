from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api.v1.routers.appointments.endpoints import router as appointment_router
from .api.v1.routers.auth.endpoints import router as auth_router
from .api.v1.routers.clients.endpoints import router as client_router
from .api.v1.routers.nail_designs.endpoints import router as nail_design_router
from .api.v1.routers.nail_services.endpoints import router as nail_service_router
from .api.v1.routers.sculping_nail_sizes.endpoints import router as sculpign_nail_size
from .api.v1.routers.users.endpoints import router as user_router
from .core.config import settings

app = FastAPI(title=settings.PROJECT_NAME)
api_version = settings.API_VERSION_STR

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix=f"{api_version}/auth", tags=["Auth"])
app.include_router(user_router, prefix=f"{api_version}/users", tags=["Users"])
app.include_router(client_router, prefix=f"{api_version}/clients", tags=["Clients"])
app.include_router(
    nail_design_router, prefix=f"{api_version}/nail_designs", tags=["Nail Designs"]
)
app.include_router(
    nail_service_router, prefix=f"{api_version}/nail_services", tags=["Nail Services"]
)
app.include_router(
    appointment_router, prefix=f"{api_version}/appointments", tags=["Appointments"]
)
app.include_router(
    sculpign_nail_size,
    prefix=f"{api_version}/sculping_nail_size",
    tags=["Sculping Nail Size"],
)
