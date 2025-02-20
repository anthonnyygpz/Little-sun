import { ChevronLeft, Plus } from "lucide-react";
import { ButtonLink } from "../../components/Buttons/buttonLink.tsx";
import DefaultLayout from "../../layouts/defaultLayout.tsx";
import TableService from "../../sections/tableService.tsx";
import { Link } from "react-router-dom";

const ServicePage = () => {
  return (
    <DefaultLayout site="Servicios">
      <div className="container">
        <ButtonLink
          icon={<ChevronLeft size={30} />}
          text="Regresar"
          route="/"
        />
        <Link to="/Services/AddServices">
          <button className="button-link">
            <Plus />
            <span>Crear servicio</span>
          </button>
        </Link>
      </div>
      <TableService />
    </DefaultLayout>
  );
};

export default ServicePage;
