import { useCardNailService } from "./hooks/useCardNailService";
import { Checkbox } from "../common/Checkbox";
import { SelectedIdsService } from "../../types/nailService.types";
import { Button } from "../common/Button";
import { ErrorCard } from "../common/Card";
import Skeleton from "react-loading-skeleton";

interface CardNailServiceProps {
  onChange: (data: SelectedIdsService) => void;
}

export const CardNailService: React.FC<CardNailServiceProps> = ({
  onChange,
}) => {
  const {
    nailServices,
    formData,
    loading,
    error,
    handleCheckboxChange,
    handleUncheckAll,
    listNailService,
  } = useCardNailService({
    onChange,
  });
  if (error)
    return <ErrorCard onRetry={listNailService} technicalDetails={error} />;

  return (
    <div className="space-y-3">
      {loading ? (
        <Skeleton count={3} height={20} />
      ) : (
        <>
          {nailServices.map((nailService) => (
            <div key={nailService.service_id}>
              <Checkbox
                idKey={nailService.service_id}
                name={nailService.service_name}
                selectedIds={formData.ids}
                price={nailService.base_price}
                onChange={() =>
                  handleCheckboxChange(
                    nailService.service_id,
                    nailService.service_name,
                    nailService.base_price,
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
