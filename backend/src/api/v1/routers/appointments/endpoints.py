from fastapi import APIRouter, Depends, status, HTTPException
from src.api import dependencies
from src.models.user import User
from src.schemas.appointment import (
    AppointmentFullCreate,
    AppointmentFullUpdate,
    AppointmentResponse,
)
from src.schemas.user import UserResponse

from .dependencies import AppointmentService, get_appointment_service

router = APIRouter()


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create(
    appointment_in: AppointmentFullCreate,
    appointment_service: AppointmentService = Depends(get_appointment_service),
    current_user: UserResponse = Depends(dependencies.get_current_user),
):
    return await appointment_service.create_full_appointment(
        user_id=current_user.user_id, appointment_in=appointment_in
    )


@router.get("/", status_code=status.HTTP_200_OK)
async def get_all_appointments(
    appointment_service: AppointmentService = Depends(get_appointment_service),
    current_user: UserResponse = Depends(dependencies.get_current_user),
):
    user_id = current_user.user_id
    return await appointment_service.get_all_appointments(user_id)


# @router.put("/")
# async def update(
#     appointment_in: AppointmentFullUpdate,
#     appointment_service: AppointmentService = Depends(get_appointment_service),
#     current_user: User = Depends(dependencies.get_current_user),
# ):
#     return await appointment_service.update_appointment(appointment_in)


@router.put("/delete-nail-size-id/{appointment_id}")
async def delete_sculping_nail_size(
    appointment_id: int,
    appointment_service: AppointmentService = Depends(get_appointment_service),
    current_user: UserResponse = Depends(dependencies.get_current_user),
):
    return await appointment_service.delete_nail_size_id(appointment_id)


@router.delete("/{appointment_id}")
async def delete(
    appointment_id: int,
    appointment_service: AppointmentService = Depends(get_appointment_service),
    current_user: UserResponse = Depends(dependencies.get_current_user),
):
    success = await appointment_service.delete_appointment(appointment_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="The appointment not found"
        )
    return success
