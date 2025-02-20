import { ChevronLeft, Plus } from "lucide-react";
import { ButtonLink } from "../../components/Buttons/buttonLink.tsx";
import DefaultLayout from "../../layouts/defaultLayout.tsx";
import TableDesign from "../../sections/tableDesign.tsx";
import { Link } from "react-router-dom";

const DesignPage = () => {
  return (
    <DefaultLayout site="Diseños">
      <div className="container">
        <ButtonLink
          icon={<ChevronLeft size={30} />}
          text="Regresar"
          route="/"
        />
        <Link to="/Designs/AddDesigns">
          <button className="button-link">
            <Plus />
            <span>Crear Diseño</span>
          </button>
        </Link>
      </div>

      <TableDesign />
    </DefaultLayout>
  );
};

export default DesignPage;
