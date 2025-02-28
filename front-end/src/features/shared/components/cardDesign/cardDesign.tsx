import Button from "../button.tsx";
import { CheckboxList } from "../checkbox.tsx";
import Card from "../card.tsx";
import SubTitle from "../subTitle.tsx";
import Label from "../label.tsx";
import AlertDialog from "../AlertDialog.tsx";
import { useDesigns } from "./hooks/useDesign.ts";
import { DesignResponse } from "../../types/designTypes.ts";

interface CardDesignProps {
  onChange: (data: {
    options: number[];
    designs: { name: string; price: number }[];
  }) => void;
  defaultDesign?: string;
  handleDelete?: (value: boolean) => void;
}

const CardDesign: React.FC<CardDesignProps> = ({
  onChange,
  defaultDesign = "",
  handleDelete,
}) => {
  const {
    designs,
    loading,
    error,
    handleCheckboxChange,
    handleUncheckAll,
    handleIsDelete,
    selectedItems,
  } = useDesigns({ onChange, handleDelete });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Card>
      <SubTitle title="Diseños" />
      {designs.map((design: DesignResponse) => (
        <div key={design.design_id}>
          <CheckboxList
            idKey={design.design_id}
            name={design.design_name}
            selectedOptions={selectedItems.options}
            handleCheckboxChange={() =>
              handleCheckboxChange(
                design.design_id,
                design.design_name,
                design.price,
              )
            }
          />
          <Label className="label" text={` - $${design.price}`} />
        </div>
      ))}
      {defaultDesign !== "" ? (
        <Label className="label" text={"Datos: " + defaultDesign} />
      ) : (
        ""
      )}
      <div className="wrapper between">
        <Button text="Desmarcar" onClick={handleUncheckAll} />
        {defaultDesign !== "" ? (
          <AlertDialog
            nameText={defaultDesign}
            nameSection="Diseño"
            onChange={handleIsDelete}
          />
        ) : (
          ""
        )}
      </div>
    </Card>
  );
};

export default CardDesign;
