import { useState } from "react";
import { FormData } from "../../shared/types/formDataTypes.ts";

const useFormState = () => {
  const [formData, setFormData] = useState<FormData>({
    clientInfo: { name: "", phone: 0 },
    nailSize: { selectedValue: "", id: 0, price: 0 },
    services: {
      options: [] as number[],
      services: [] as { name: string; price: number }[],
    },
    designs: {
      options: [] as number[],
      designs: [] as { name: string; price: number }[],
    },
    totalPrice: 0 as number, // Especifica que totalPrice es de tipo number
  });

  const calculateTotalPrice = (
    services: { price: number }[],
    designs: { price: number }[],
    nailSizePrice: number,
  ): number => {
    const servicesTotal = services.reduce(
      (total, service) => total + service.price,
      0,
    );
    const designsTotal = designs.reduce(
      (total, design) => total + design.price,
      0,
    );
    return servicesTotal + designsTotal + nailSizePrice;
  };

  const resetAll = () => {
    window.location.reload();
  };

  const handleClientInfoChange = (data: { name: string; phone: string }) => {
    setFormData((prev) => ({
      ...prev,
      clientInfo: { name: data.name, phone: Number(data.phone) },
    }));
  };

  const handleNailSizeChange = (data: {
    selectedValue: string;
    id: number;
    price: number;
  }) => {
    setFormData((prev) => {
      const newFormData = {
        ...prev,
        nailSize: data,
      };
      const totalPrice = calculateTotalPrice(
        newFormData.services.services,
        newFormData.designs.designs,
        newFormData.nailSize.price, // Pasar el precio de nailSize
      );
      return {
        ...newFormData,
        totalPrice,
      };
    });
  };

  const handleServicesChange = (data: {
    options: number[];
    services: { name: string; price: number }[];
  }) => {
    setFormData((prev) => {
      const newFormData = {
        ...prev,
        services: data,
      };
      const totalPrice = calculateTotalPrice(
        newFormData.services.services,
        newFormData.designs.designs,
        newFormData.nailSize.price,
      );
      return {
        ...newFormData,
        totalPrice,
      };
    });
  };

  const handleDesignChange = (data: {
    options: number[];
    designs: { name: string; price: number }[];
  }) => {
    setFormData((prev) => {
      const newFormData = {
        ...prev,
        designs: data,
      };
      const totalPrice = calculateTotalPrice(
        newFormData.services.services,
        newFormData.designs.designs,
        newFormData.nailSize.price,
      );
      return {
        ...newFormData,
        totalPrice,
      };
    });
  };

  return {
    formData,
    resetAll,
    handleClientInfoChange,
    handleNailSizeChange,
    handleServicesChange,
    handleDesignChange,
  };
};

export default useFormState;
