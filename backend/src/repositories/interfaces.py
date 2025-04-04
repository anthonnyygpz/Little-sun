from abc import ABC, abstractmethod
from typing import List, Optional

from src.models.appointment import Appointment
from src.models.appointment_design import AppointmentDesign
from src.models.appointment_service import AppointmentService
from src.models.nail_design import NailDesign
from src.models.user import User
from src.schemas.appointment import (
    AppointmentCreate,
    AppointmentFullUpdate,
    AppointmentResponse,
)
from src.schemas.appointment_design import AppointmenDesigntCreate
from src.schemas.appointment_service import AppointmentServiceCreate
from src.schemas.client import ClientCreate, ClientResponse, ClientUpdate
from src.schemas.nail_design import (
    NailDesignCreate,
    NailDesignResponse,
    NailDesignUpdate,
)
from src.schemas.nail_service import (
    NailServiceCreate,
    NailServiceResponse,
    NailServiceUpdate,
)
from src.schemas.sculping_nail_size import (
    SculpingNailSizeCreate,
    SculpingNailSizeResponse,
    SculpingNailSizeUpdate,
)
from src.schemas.user import UserCreate


### IClient
class IClientRepository(ABC):
    @abstractmethod
    async def create_client(
        self, user_id: int, client_in: ClientCreate
    ) -> ClientResponse:
        pass

    @abstractmethod
    async def get_client_all(
        self, user_id: int, skip: int = 0, limit: int = 100
    ) -> List[ClientResponse]:
        pass

    @abstractmethod
    async def get_client_by_name(
        self, user_id: int, name: str
    ) -> Optional[ClientResponse]:
        pass

    @abstractmethod
    async def update_client(
        self, client_id: int, client_in: ClientUpdate
    ) -> Optional[ClientResponse]:
        pass

    @abstractmethod
    async def delete_client(self, client_id: int) -> bool:
        pass


### IAppointment
class IAppointmentRepository(ABC):
    @abstractmethod
    async def create_appointment(
        self, user_id: int, appointment_in: AppointmentCreate
    ) -> AppointmentResponse:
        pass

    @abstractmethod
    async def get_all_appointments(self, user_id: int) -> List[tuple]:
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
    async def create_nail_design(
        self, nail_design_in: NailDesignCreate
    ) -> NailDesignResponse:
        pass

    @abstractmethod
    async def get_all_nail_design(
        self, user_id: int, skip: int, limit: int
    ) -> List[NailDesignResponse]:
        pass

    @abstractmethod
    async def get_nail_design_by_name(
        self, user_id: int, name_in: str
    ) -> Optional[NailDesignResponse]:
        pass

    @abstractmethod
    async def get_nail_design_by_id(
        self, user_id: int, nail_design_id: int
    ) -> Optional[NailDesignResponse]:
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
        self, user_id: int, nail_service_in: NailServiceCreate
    ) -> NailServiceResponse:
        pass

    @abstractmethod
    async def get_all_nail_service(
        self, user_id: int, skip: int, limit: int
    ) -> List[NailServiceResponse]:
        pass

    @abstractmethod
    async def get_nail_service_by_name(
        self, user_id: int, name_in: str
    ) -> Optional[NailServiceResponse]:
        pass

    @abstractmethod
    async def get_nail_service_by_id(
        self, user_id: int, nail_service_id: int
    ) -> Optional[NailServiceResponse]:
        pass

    @abstractmethod
    async def update_nail_service(
        self, nail_service_id: int, nail_service_in: NailServiceUpdate
    ) -> NailServiceResponse:
        pass

    @abstractmethod
    async def delete_nail_service(self, nail_service_id: int) -> bool:
        pass


### ISculpingNailSize
class ISculpingNailSizeRepository(ABC):
    @abstractmethod
    async def create_sculping_nail_size(
        self, user_id: int, sculping_nail_size_in: SculpingNailSizeCreate
    ) -> SculpingNailSizeResponse:
        pass

    @abstractmethod
    async def get_all_sculping_nail_size(
        self, user_id: int, skip: int, limit: int
    ) -> List[SculpingNailSizeResponse]:
        pass

    @abstractmethod
    async def get_all_sculping_nail_size_by_id(
        self, user_id: int, sculping_nail_size_id: int
    ) -> List[SculpingNailSizeResponse]:
        pass

    @abstractmethod
    async def update_sculping_nail_size(
        self, sculping_nail_size_id: int, sculping_nail_size_in: SculpingNailSizeUpdate
    ) -> SculpingNailSizeResponse:
        pass

    @abstractmethod
    async def delete_sculping_nail_size(self, sculping_nail_size_id: int) -> bool:
        pass
