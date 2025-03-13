from typing import Dict, List, Optional

from models.client import Client
from models.design import Design
from models.quote import Quote
from models.quote_design import QuoteDesign
from models.quote_service import QuoteService
from models.sculping_size import SculpingNailSize
from models.service import Service
from schemas.quote import AppointmentCreate, AppointmentUpdate
from services.appointment_service import AppointmentService
from sqlalchemy import distinct, func
from sqlalchemy.orm import Session


class CRUDQuote:
    def create(self, db: Session, *, obj_in: AppointmentCreate) -> Quote:
        # Crear un diccionario con los datos de la cotización
        quote_data = {
            "client_id": obj_in.client_id,
        }

        # Incluir nail_size_id solo si no está vacío
        if obj_in.nail_size_id != 0:
            quote_data["nail_size_id"] = obj_in.nail_size_id

        # Crear el objeto Quote con los datos proporcionados
        obj_db = Quote(**quote_data)

        # Guardar en la base de! datos
        db.add(obj_db)
        db.commit()
        db.refresh(obj_db)
        return obj_db

    def get_all(self, db: Session) -> List[Dict]:
        obj_db = (
            db.query(
                Quote.quote_id,
                Quote.client_id,
                Client.name.label("client_name"),
                Client.phone_number,
                SculpingNailSize.size_name,
                Quote.nail_size_id,
                func.string_agg(distinct(Service.service_name), ", ").label("services"),
                func.string_agg(distinct(Design.design_name), ", ").label("designs"),
                Quote.status,
                Quote.created_at,
            )
            .outerjoin(Client, Quote.client_id == Client.client_id)
            .outerjoin(SculpingNailSize, Quote.nail_size_id == SculpingNailSize.size_id)
            .outerjoin(QuoteService, Quote.quote_id == QuoteService.quote_id)
            .outerjoin(Service, QuoteService.service_id == Service.service_id)
            .outerjoin(QuoteDesign, Quote.quote_id == QuoteDesign.quote_id)
            .outerjoin(Design, QuoteDesign.design_id == Design.design_id)
            .group_by(
                Quote.quote_id,
                Quote.client_id,
                Client.name,
                Client.phone_number,
                SculpingNailSize.size_name,
                Quote.nail_size_id,
                Quote.status,
                Quote.created_at,
            )
            .order_by(Quote.created_at.desc())
            .all()
        )

        return [
            {
                "quote_id": query.quote_id,
                "client_id": query.client_id,
                "name": query.client_name.title(),
                "size_name": query.size_name if query.size_name else "",
                "phone_number": query.phone_number,
                "services": query.services if query.services else "",
                "designs": query.designs if query.designs else "",
                "total_amount": AppointmentService(db).total_amount(
                    db, quote_id=query.quote_id, size_id=query.nail_size_id
                ),
                "status": query.status,
                "created_at": query.created_at,
                "nail_size_id": query.nail_size_id if query.nail_size_id else 0,
            }
            for query in obj_db
        ]

    def get_by_id(self, db: Session, *, id: int) -> Optional[Quote]:
        return db.query(Quote).filter_by(quote_id=id).first()

    def update(self, db: Session, *, obj_in: AppointmentUpdate) -> Dict:
        obj_quote = {}
        if obj_in.client_id != 0:
            obj_quote["client_id"] = obj_in.client_id
        if obj_in.nail_size_id != 0:
            obj_quote["nail_size_id"] = obj_in.nail_size_id
        if obj_in.status != "":
            obj_quote["status"] = obj_in.status
        if obj_quote:
            db.query(Quote).filter_by(quote_id=obj_in.quote_id).update(obj_quote)
            db.commit()

        existing_designs = (
            db.query(QuoteDesign).filter_by(quote_id=obj_in.quote_id).all()
        )

        if obj_in.designs != []:
            if existing_designs:
                db.query(QuoteDesign).filter_by(quote_id=obj_in.quote_id).delete()

            for id in obj_in.designs:
                add_obj_designs = QuoteDesign(quote_id=obj_in.quote_id, design_id=id)
                db.add(add_obj_designs)
                db.commit()
                db.refresh(add_obj_designs)

        # elif not existing_designs:
        #     add_obj_designs = QuoteDesign(quote_id=obj_in.quote_id, design_id=0)
        #     db.add(add_obj_designs)
        #     db.commit()
        #     db.refresh(add_obj_designs)

        existing_services = (
            db.query(QuoteService).filter_by(quote_id=obj_in.quote_id).all()
        )

        if obj_in.services != []:
            if existing_services:
                db.query(QuoteService).filter_by(quote_id=obj_in.quote_id).delete()
            for id in obj_in.services:
                add_obj_services = QuoteService(quote_id=obj_in.quote_id, service_id=id)
                db.add(add_obj_services)
                db.commit()
                db.refresh(add_obj_services)

        # elif not existing_services:
        #     add_obj_services = QuoteService(quote_id=obj_in.quote_id, service_id=0)
        #     db.add(add_obj_services)
        #     db.commit()
        #     db.refresh(add_obj_services)

        obj_client = {}
        if obj_in.name != "":
            obj_client["name"] = obj_in.name
        if obj_in.phone_number != 0:
            obj_client["phone_number"] = obj_in.phone_number

        if obj_client:
            db.query(Client).filter_by(client_id=obj_in.client_id).update(obj_client)
            db.commit()

        return {"message": "Datos actulizados"}

    def delete(self, db: Session, *, id: int):
        obj_quote = db.query(Quote).filter_by(quote_id=id).delete()
        db.commit()
        return obj_quote

    def delete_sculping_nail_size(self, db: Session, *, id: int):
        obj_quote = (
            db.query(Quote).filter_by(quote_id=id).update({"nail_size_id": None})
        )
        db.commit()
        return obj_quote


crud_quote = CRUDQuote()
