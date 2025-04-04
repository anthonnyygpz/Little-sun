import { SculpingNailSizeResponse } from "../../types/sculpingNailSizeTypes.ts";
import AlertDialog from "../AlertDialog.tsx";
import Button from "../button.tsx";
import { Card, LoadingCard, ErrorCard } from "../card.tsx";
import Label from "../label.tsx";
import RadioButtonGroup from "../radioButton.tsx";
import SubTitle from "../subTitle.tsx";
import { useSculpingSize } from "./hooks/useSculpingSize.ts";

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
    getAllSculpingSize,
  } = useSculpingSize({ onChange, handleDelete });

  if (loading) return <LoadingCard />;
  if (error)
    return <ErrorCard onRetry={getAllSculpingSize} technicalDetails={error} />;

  return (
    <Card>
      <SubTitle title={"Tamaño de esculpido"} />
      {sculpingSizes.map((sculpingSize: SculpingNailSizeResponse) => (
        <div key={sculpingSize.size_id} className="flex space-x-1 space-y-1">
          <RadioButtonGroup
            idKey={sculpingSize.size_id}
            name={sculpingSize.size_name}
            value={sculpingSize.size_name}
            price={sculpingSize.base_price}
            selectedValue={selectedOption}
            onChange={(data) => handleOptionChange(data)}
          />
          <Label
            className="text-green-700 items-center justify-center flex "
            text={` - $${sculpingSize.base_price}`}
            id={`radio-${sculpingSize.size_id}-${sculpingSize.size_name}`}
          />
        </div>
      ))}
      {defaultSculpingSize !== "" ? (
        <Label className="" text={"Datos: " + defaultSculpingSize} />
      ) : (
        ""
      )}
      <div className="flex justify-center">
        <Button onClick={handleUncheckAll}>Desmarcar</Button>
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
