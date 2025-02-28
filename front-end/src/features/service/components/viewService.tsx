import { ChevronLeft, Plus } from "lucide-react";
import { ButtonLink } from "../../shared/components/buttonLink.tsx";
import DefaultLayout from "../../shared/components/defaultLayout.tsx";
import TableService from "../../shared/components/tableService/tableService.tsx";
import { Link } from "react-router-dom";

const ViewService = () => {
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

export default ViewService;
