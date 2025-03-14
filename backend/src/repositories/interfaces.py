from abc import ABC, abstractmethod
from typing import List, Optional

from src.models.appointment import Appointment
from src.models.appointment_design import AppointmentDesign
from src.models.appointment_service import AppointmentService
from src.models.client import Client
from src.models.nail_design import NailDesign
from src.models.nail_service import NailService
from src.models.sculping_size import SculpingNailSize
from src.models.user import User
from src.schemas.appointment import (
    AppointmenDesigntCreate,
    AppointmentCreate,
    AppointmentFullUpdate,
    AppointmentResponse,
    AppointmentServiceCreate,
)
from src.schemas.client import ClientCreate, ClientUpdate
from src.schemas.nail_design import NailDesignCreate, NailDesignUpdate
from src.schemas.nail_service import NailServiceCreate, NailServiceUpdate
from src.schemas.sculping_nail_size import (
    SculpingNailSizeCreate,
    SculpingNailSizeUpdate,
)
from src.schemas.user import UserCreate


### IClient
class IClientRepository(ABC):
    @abstractmethod
    async def create_client(self, client_in: ClientCreate) -> Client:
        pass

    @abstractmethod
    async def get_client_all(self, skip: int = 0, limit: int = 100) -> List[Client]:
        pass

    @abstractmethod
    async def get_client_by_name(self, name: str) -> Optional[Client]:
        pass

    @abstractmethod
    async def update_client(
        self, client_id: int, client_in: ClientUpdate
    ) -> Optional[Client]:
        pass

    @abstractmethod
    async def delete_client(self, client_id: int) -> bool:
        pass


### IAppointment
class IAppointmentRepository(ABC):
    @abstractmethod
    async def create_appointment(
        self, appointment_in: AppointmentCreate
    ) -> AppointmentResponse:
        pass

    @abstractmethod
    async def get_all_appointments(self) -> List[tuple]:
        pass

    @abstractmethod
    async def update_appointment(self, appointment_in: AppointmentFullUpdate) -> bool:
        pass

    @abstractmethod
    async def delete_nail_size_id(self, appointment_id: int) -> bool:
        pass

    @abstractmethod
    async def delete_appointment(self, appointment_id: int) -> bool:
        pass


###IAppointmentDesign
class IAppointmentDeisngRepository(ABC):
    @abstractmethod
    async def create_appointment_design(
        self, appointment_in: AppointmenDesigntCreate
    ) -> Appointment:
        pass

    @abstractmethod
    async def get_all_appointment_by_id(
        self, appointment_id: int
    ) -> List[AppointmentDesign]:
        pass

    # @abstractmethod
    # async def get_appointment_by_id(
    #     self, appointment_id: int
    # ) -> Optional[AppointmentDesign]:
    #     pass

    # @abstractmethod
    # async def delete_appointment_design(self):
    #     pass


### IAppointmentService
class IAppointmentServiceRepository(ABC):
    @abstractmethod
    async def create_appointment_service(
        self, appointment_in: AppointmentServiceCreate
    ) -> Appointment:
        pass

    @abstractmethod
    async def get_all_appointment_by_id(
        self, appointment_id: int
    ) -> List[AppointmentService]:
        pass

    # @abstractmethod
    # async def get_appointment_by_id(self) -> Optional[AppointmentDesign]:
    #     pass
    #
    # @abstractmethod
    # async def delete_appointment_design(self, appointment_id: int) -> bool:
    #     pass


### IAuth
class IAuthRepository(ABC):
    pass


### IUser
class IUserRepository(ABC):
    @abstractmethod
    async def create_user(self, user_in: UserCreate) -> User:
        pass

    @abstractmethod
    async def get_by_email(self, email: str) -> User:
        pass


### INailDesign
class INailDesignRepository(ABC):
    @abstractmethod
    async def create_nail_design(self, nail_design_in: NailDesignCreate) -> NailDesign:
        pass

    @abstractmethod
    async def get_all_nail_design(self) -> Optional[List[NailDesign]]:
        pass

    @abstractmethod
    async def get_nail_design_by_name(self, name_in: str) -> Optional[NailDesign]:
        pass

    @abstractmethod
    async def get_nail_design_by_id(self, nail_design_id: int) -> Optional[NailDesign]:
        pass

    @abstractmethod
    async def update_nail_design(
        self, nail_design_in: NailDesignUpdate, nail_design_id: int
    ) -> NailDesign:
        pass

    @abstractmethod
    async def delete_nail_design(self, nail_design_id: int) -> bool:
        pass


### INailService
class INailServiceRepository(ABC):
    @abstractmethod
    async def create_nail_service(
        self, nail_service_in: NailServiceCreate
    ) -> NailService:
        pass

    @abstractmethod
    async def get_all_nail_service(self, skip: int, limit: int) -> List[NailService]:
        pass

    @abstractmethod
    async def get_nail_service_by_name(self, name_in: str) -> Optional[NailService]:
        pass

    @abstractmethod
    async def get_nail_service_by_id(
        self, nail_service_id: int
    ) -> Optional[NailService]:
        pass

    @abstractmethod
    async def update_nail_service(
        self, nail_service_id: int, nail_service_in: NailServiceUpdate
    ) -> NailService:
        pass

    @abstractmethod
    async def delete_nail_service(self, nail_service_id: int) -> bool:
        pass


### ISculpingNailSize
class ISculpingNailSizeRepository(ABC):
    @abstractmethod
    async def create_sculping_nail_size(
        self, sculping_nail_size_in: SculpingNailSizeCreate
    ) -> SculpingNailSize:
        pass

    @abstractmethod
    async def get_all_sculping_nail_size_by_id(
        self, size_id: int
    ) -> List[SculpingNailSize]:
        pass

    @abstractmethod
    async def update_sculping_nail_size(
        self, sculping_nail_size_id: int, sculping_nail_size_in: SculpingNailSizeUpdate
    ) -> SculpingNailSize:
        pass

    @abstractmethod
    async def delete_sculping_nail_size(self, sculping_nail_size_id: int) -> bool:
        pass
