import Skeleton from "react-loading-skeleton";
import { SculpingNailSizeForm } from "../../types/sculpingNailSize.types";
import { useCardSculpingNailSize } from "./hooks/useCardSculpingNailSize";
import { Button } from "../common/Button";
import { ErrorCard } from "../common/Card";

interface CardSculpingNailSizeProps {
  onChange: (data: SculpingNailSizeForm) => void;
}

export const CardSculpingNailSize: React.FC<CardSculpingNailSizeProps> = ({
  onChange,
}) => {
  const {
    listSculping,
    loadingListSculping,
    errorListSculpíng,
    handleUncheckAll,
    formData,
    handleSelection,
    listSculpingNailSize,
  } = useCardSculpingNailSize({ onChange });

  if (errorListSculpíng && listSculping.length > 0)
    return (
      <ErrorCard
        onRetry={() => listSculpingNailSize()}
        technicalDetails={errorListSculpíng}
      />
    );

  return (
    <div>
      {loadingListSculping ? (
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <button
              key={index}
              type="button"
              className="py-3 px-4 rounded-lg transition-all bg-white border border-gray-200 text-gray-700 hover:border-purple-400 "
            >
              <Skeleton width={70} />
              <div className="text-xs mt-1 font-normal">
                <Skeleton width={50} />
              </div>
            </button>
          ))}
        </div>
      ) : listSculping.length === 0 ? (
        <div className="flex">
          <span className="text-gray-500">
            No hay tamaños de uñas disponibles
          </span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-3">
            {listSculping.map((sculping) => (
              <button
                className={`py-3 px-4 rounded-lg transition-all ${
                  formData?.nailLength === sculping.size_name
                    ? "bg-purple-400 text-white shadow-md"
                    : "bg-white border border-gray-200 text-gray-700 hover:border-purple-400"
                }`}
                onClick={() =>
                  handleSelection({
                    nailLength: sculping.size_name,
                    size_id: sculping.size_id,
                    price: sculping.base_price,
                  })
                }
                key={sculping.size_id}
                type="button"
              >
                {loadingListSculping ? <Skeleton /> : sculping.size_name}
                <div className="text-xs mt-1 font-normal">
                  {loadingListSculping ? (
                    <Skeleton />
                  ) : (
                    `$ ${sculping.base_price}`
                  )}
                </div>
              </button>
            ))}
          </div>
          {formData?.nailLength && (
            <div className="flex justify-center pt-4">
              <Button onClick={handleUncheckAll}>Desmarcar</Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
