from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.config import settings
from api.v1.endpoints import (
    clients,
    designs,
    quote_designs,
    quote_services,
    quotes,
    sculping_nail_sizes,
    services,
)

app = FastAPI(title=settings.PROJECT_NAME)
api_version = settings.API_VERSION_STR

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(services.router, prefix=f"{api_version}/services", tags=["Services"])
app.include_router(designs.router, prefix=f"{api_version}/designs", tags=["Designs"])
app.include_router(
    sculping_nail_sizes.router,
    prefix=f"{api_version}/sculpign_nail_size",
    tags=["Sculping_Nail_Size"],
)
app.include_router(clients.router, prefix=f"{api_version}/clients", tags=["Clients"])
app.include_router(quotes.router, prefix=f"{api_version}/quotes", tags=["Quotes"])
app.include_router(
    quote_designs.router, prefix=f"{api_version}/quote_designs", tags=["Quote_Designs"]
)
app.include_router(
    quote_services.router,
    prefix=f"{api_version}/quote_services",
    tags=["Quote_Services"],
)
