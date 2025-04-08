import Skeleton from "react-loading-skeleton";
import { NailDesign, SelectedIdsDesign } from "../../types/nailDesign.types";
import { Button } from "../common/Button";
import { ErrorCard } from "../common/Card";
import { Checkbox } from "../common/Checkbox";
import { useCardNailDesign } from "./hooks/useCardNailDesign";

interface CardNailDesign {
  onChange: (data: SelectedIdsDesign) => void;
}

export const CardNailDesign: React.FC<CardNailDesign> = ({ onChange }) => {
  const {
    nailDesigns,
    loading,
    error,
    formData,
    handleCheckboxChange,
    handleUncheckAll,
    listNailDesign,
  } = useCardNailDesign({ onChange });
  if (error && nailDesigns.length > 0)
    return <ErrorCard onRetry={listNailDesign} technicalDetails={error} />;

  return (
    <div>
      {loading ? (
        <Skeleton count={3} height={20} />
      ) : nailDesigns.length === 0 ? (
        <div className="flex">
          <span className="text-gray-500">No hay diseños disponible</span>
        </div>
      ) : (
        <>
          {nailDesigns.map((nailDesign: NailDesign) => (
            <div key={nailDesign.design_id}>
              <Checkbox
                idKey={nailDesign.design_id}
                name={nailDesign.design_name}
                selectedIds={formData.ids}
                price={nailDesign.base_price}
                onChange={() =>
                  handleCheckboxChange(
                    nailDesign.design_id,
                    nailDesign.design_name,
                    nailDesign.base_price,
                  )
                }
              />
            </div>
          ))}

          {formData.ids.length > 0 && (
            <div className="flex justify-center">
              <Button onClick={handleUncheckAll}>Desmarcar</Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
