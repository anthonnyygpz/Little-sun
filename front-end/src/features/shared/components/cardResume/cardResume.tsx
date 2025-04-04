import { X } from "lucide-react";

interface FormDataProps {
  isModalOpen: boolean;
  setIsModalOpen: boolean;
  formData: {
    clientInfo: {
      name: string;
      phone: number;
    };
    nailSize: {
      selectedValue: string;
      id: number;
    };
    services: {
      options: number[];
      services: {
        name: string;
        price: number;
      }[];
    };
    designs: {
      options: number[];
      designs: {
        name: string;
        price: number;
      }[];
    };
    totalPrice: number;
    status?: { selectedValue: string; id: number };
  };
}

const CardResume: React.FC<FormDataProps> = ({
  formData,
  isModalOpen,
  setIsModalOpen,
}) => {
  const { clientInfo, nailSize, services, designs, totalPrice } = formData;

  return (
    <div className="fixed inset-0 bg-black/500 flex items-center justify-center z-500 p-4">
      <div className="relative w-full max-w-md animate-in fade-in zoom-in duration-300">
        <div className="w-full shadow-lg">
          <div className="bg-primary/5 relative">
            <button type="button" onClick={() => setIsModalOpen(false)}>
              <X />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardResume;
