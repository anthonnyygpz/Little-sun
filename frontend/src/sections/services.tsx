import Button from "../components/Buttons/button.tsx";
import Card from "../components/card.tsx";
import SubTitle from "../components/subTitle.tsx";
import { CheckboxList } from "../components/checkbox.tsx";
import Label from "../components/label.tsx";
import AlertDialog from "../components/AlertDialog.tsx";
import { useServices } from "../hooks/useServiceSection.ts";
import { PilcrowLeft } from "lucide-react";

interface ServicesProps {
  onChange: (data: {
    options: number[];
    services: { name: string; price: number }[];
  }) => void;
  defaultService?: string; // defaultService es opcional
  handleDelete?: (value: boolean) => void; // handleDelete es opcional
}

const Services: React.FC<ServicesProps> = ({
  onChange,
  defaultService = "",
  handleDelete,
}) => {
  const {
    handleCheckboxChange,
    services,
    loading,
    error,
    handleUncheckAll,
    handleIsDelete,
    selectedItems,
  } = useServices({ onChange, handleDelete });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Card>
      <SubTitle title="Servicios" />
      {services.map(({ service_id, service_name, price }) => (
        <div key={service_id}>
          <CheckboxList
            idKey={service_id}
            name={service_name}
            selectedOptions={selectedItems.options}
            handleCheckboxChange={() =>
              handleCheckboxChange(service_id, service_name, price)
            }
          />
          <Label className="label" text={` - $${price}`} />
        </div>
      ))}
      {defaultService !== "" ? (
        <Label className="label" text={"Datos: " + defaultService} />
      ) : (
        ""
      )}
      <div className="wrapper between">
        <Button text="Desmarcar" onClick={handleUncheckAll} />
        {defaultService !== "" ? (
          <AlertDialog
            nameText={defaultService}
            nameSection="Servicios"
            onChange={handleIsDelete}
          />
        ) : (
          ""
        )}
      </div>
    </Card>
  );
};

export default Services;
