import Button from "../components/Button";
import Card from "../components/Card";
import SubTitle from "../components/SubTitle";
import { CheckboxList } from "../components/Checkbox";
import Label from "../components/Label";
import AlertDialog from "../components/AlertDialog.tsx";
import { useServices } from "../hooks/useServiceSection.ts";

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
