import { Title } from "../../shared/components/title";
import DefaultLayout from "../../shared/components/defaultLayout";
import AddDesignSection from "../../shared/components/cardAddDesign/cardAddDesign";

const AddDesign: React.FC = () => {
  return (
    <DefaultLayout site="Agregar Diseño">
      <Title title="Agregar diseño" className="title-purple" />
      <AddDesignSection />
    </DefaultLayout>
  );
};

export default AddDesign;
