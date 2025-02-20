import { useState } from "react";
import { FormData } from "../models/formData.models";

const useFormState = () => {
  const [formData, setFormData] = useState<FormData>({
    clientInfo: { name: "", phone: 1 },
    nailSize: { selectedValue: "", id: 1 },
    services: {
      options: [] as number[],
      services: [] as { name: string; price: number }[],
    },
    designs: {
      options: [] as number[],
      designs: [] as { name: string; price: number }[],
    },
    totalPrice: 0,
  });

  const resetAll = () => {
    setFormData({
      clientInfo: { name: "", phone: 1 },
      nailSize: { selectedValue: "", id: 1 },
      services: {
        options: [] as number[],
        services: [] as { name: string; price: number }[],
      },
      designs: {
        options: [] as number[],
        designs: [] as { name: string; price: number }[],
      },
      totalPrice: 0,
    });
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
  }) => {
    setFormData((prev) => ({
      ...prev,
      nailSize: data,
    }));
  };

  const handleServicesChange = (data: {
    options: number[];
    services: { name: string; price: number }[];
  }) => {
    setFormData((prev) => ({
      ...prev,
      services: data,
    }));
  };

  const handleDesignChange = (data: {
    options: number[];
    designs: { name: string; price: number }[];
  }) => {
    setFormData((prev) => ({
      ...prev,
      designs: data,
    }));
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
