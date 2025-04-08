import Skeleton from "react-loading-skeleton";

export const MobilLoadingSkeleton = () => {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <li key={index} className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Skeleton width={120} height={20} />
            <div className="flex items-center gap-2">
              <Skeleton width={80} height={28} borderRadius={8} />
              <Skeleton circle width={20} height={20} />
            </div>
          </div>
        </li>
      ))}
    </>
  );
};
