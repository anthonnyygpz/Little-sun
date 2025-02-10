from app.crud.crud_design import crud_design
from app.crud.crud_quote_design import crud_quote_design
from app.crud.crud_quote_service import crud_quote_service
from app.crud.crud_sculping_size import crud_sculping_size
from app.crud.crud_service import crud_service
from sqlalchemy.orm import Session


class ServiceQuote:
    def total_amount(self, db: Session, quote_id: int, size_id: int) -> int:
        total_price: int = 0
        id_all_service = crud_quote_service.get_by_id(db, id=quote_id)
        id_all_design = crud_quote_design.get_by_id(db, id=quote_id)
        obj_sculping_nail_size = crud_sculping_size.get_by_id(db, id=size_id)

        for item in id_all_service:
            obj_service = crud_service.get_by_id(db, service_id=item.service_id)
            total_price += obj_service.price

        for item in id_all_design:
            obj_design = crud_design.get_by_id(db, design_id=item.design_id)
            total_price += obj_design.price

        if size_id is not None:
            price: int = obj_sculping_nail_size.base_price
            total_price += price
        return total_price


service_quote = ServiceQuote()
