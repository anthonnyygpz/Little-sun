import Card from "../components/card.tsx";
import RadioButtonGroup from "../components/radioButton.tsx";
import SubTitle from "../components/subTitle.tsx";
import Button from "../components/Buttons/button.tsx";
import Label from "../components/label.tsx";
import AlertDialog from "../components/AlertDialog.tsx";
import { useSculpingSize } from "../hooks/useSculpingSizeSection.ts";

interface SculpingNailSizeProps {
  onChange: (data: { selectedValue: string; id: number }) => void;
  defaultSculpingSize?: string;
  handleDelete?: (is_delete: boolean) => void;
}

const SculpingNailSize: React.FC<SculpingNailSizeProps> = ({
  onChange,
  defaultSculpingSize = "",
  handleDelete,
}) => {
  const {
    sculpingSizes,
    loading,
    error,
    handleOptionChange,
    handleUncheckAll,
    handleIsDelete,
    selectedOption,
  } = useSculpingSize({ onChange, handleDelete });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Card>
      <SubTitle title={"Tamaño de esculpido"} />
      {sculpingSizes.map((sculpingSize) => (
        <div key={sculpingSize.size_id}>
          <RadioButtonGroup
            idKey={sculpingSize.size_id}
            name={sculpingSize.size_name}
            value={sculpingSize.size_name}
            selectedValue={selectedOption}
            onChange={(selectedValue, id) =>
              handleOptionChange(selectedValue, id)
            }
          />
        </div>
      ))}
      {defaultSculpingSize !== "" ? (
        <Label className="label" text={"Datos: " + defaultSculpingSize} />
      ) : (
        ""
      )}
      <div className="wrapper between">
        <Button text={"Desmarcar"} onClick={handleUncheckAll} />
        {defaultSculpingSize !== "" ? (
          <AlertDialog
            nameText={defaultSculpingSize}
            nameSection="Tipo de esculpido"
            onChange={handleIsDelete}
          />
        ) : (
          ""
        )}
      </div>
    </Card>
  );
};

export default SculpingNailSize;
