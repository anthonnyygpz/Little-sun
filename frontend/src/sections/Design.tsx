import Button from "../components/Button";
import { CheckboxList } from "../components/Checkbox";
import Card from "../components/Card";
import SubTitle from "../components/SubTitle";
import Label from "../components/Label.tsx";
import AlertDialog from "../components/AlertDialog.tsx";
import { useDesigns } from "../hooks/useDesignSection.ts";

interface DesignProps {
  onChange: (data: {
    options: number[];
    designs: { name: string; price: number }[];
  }) => void;
  defaultDesign?: string;
  handleDelete?: (value: boolean) => void;
}

const Design: React.FC<DesignProps> = ({
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
      {designs.map(({ design_id, design_name, price }) => (
        <div key={design_id}>
          <CheckboxList
            idKey={design_id}
            name={design_name}
            selectedOptions={selectedItems.options}
            handleCheckboxChange={() =>
              handleCheckboxChange(design_id, design_name, price)
            }
          />
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

export default Design;
