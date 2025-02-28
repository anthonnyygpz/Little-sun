import Button from "../button.tsx";
import Card from "../card.tsx";
import SubTitle from "../subTitle.tsx";
import { CheckboxList } from "../checkbox.tsx";
import Label from "../label.tsx";
import AlertDialog from "../AlertDialog.tsx";
import { useServices } from "./hooks/useService.ts";

interface ServicesProps {
  onChange: (data: {
    options: number[];
    services: { name: string; price: number }[];
  }) => void;
  defaultService?: string; // defaultService es opcional
  handleDelete?: (value: boolean) => void; // handleDelete es opcional
}

const CardService: React.FC<ServicesProps> = ({
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

export default CardService;
