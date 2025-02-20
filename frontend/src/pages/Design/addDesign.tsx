import { Title } from "../../components/title";
import DefaultLayout from "../../layouts/defaultLayout";
import AddDesignSection from "../../sections/addDesigns";

const AddDesigns: React.FC = () => {
  return (
    <DefaultLayout site="Agregar Diseño">
      <Title title="Agregar diseño" className="title-purple" />
      <AddDesignSection />
    </DefaultLayout>
  );
};

export default AddDesigns;
