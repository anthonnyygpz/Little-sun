import Card from "../card.tsx";
import RadioButtonGroup from "../radioButton.tsx";
import SubTitle from "../subTitle.tsx";
import Button from "../button.tsx";
import Label from "../label.tsx";
import AlertDialog from "../AlertDialog.tsx";
import { useSculpingSize } from "./hooks/useSculpingSize.ts";
import { SculpingNailSizeResponse } from "../../types/sculpingNailSizeTypes.ts";

interface SculpingNailSizeProps {
  onChange: (data: {
    selectedValue: string;
    id: number;
    price: number;
  }) => void;
  defaultSculpingSize?: string;
  handleDelete?: (is_delete: boolean) => void;
}

const CardSculpingNailSize: React.FC<SculpingNailSizeProps> = ({
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
      {sculpingSizes.map((sculpingSize: SculpingNailSizeResponse) => (
        <div key={sculpingSize.size_id}>
          <RadioButtonGroup
            idKey={sculpingSize.size_id}
            name={sculpingSize.size_name}
            value={sculpingSize.size_name}
            price={sculpingSize.base_price}
            selectedValue={selectedOption}
            onChange={(data) => handleOptionChange(data)}
          />
          <Label className="label" text={` - $${sculpingSize.base_price}`} />
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

export default CardSculpingNailSize;
