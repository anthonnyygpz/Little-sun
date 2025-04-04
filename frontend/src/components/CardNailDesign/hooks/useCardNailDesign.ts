import { useEffect, useState } from "react";
import { NailDesign, SelectedIdsDesign } from "../../../types/nailDesign.types";
import { nailDesignService } from "../../../api/nailDesignService";
import { useAuth } from "../../../contexts/AuthContext/hooks/useAuth";

interface useCardNailDesignProps {
  onChange: (data: SelectedIdsDesign) => void;
}

export const useCardNailDesign = ({ onChange }: useCardNailDesignProps) => {
  const [nailDesigns, setNailDesigns] = useState<NailDesign[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormdata] = useState<SelectedIdsDesign>({
    ids: [],
    nailDesignData: [],
  });
  const { isAuthenticated, token } = useAuth();

  // hooks
  const handleCheckboxChange = (
    design_id: number,
    design_name: string,
    price: number,
  ) => {
    const isSelected = formData.ids.includes(design_id);
    let updatedOptions: number[];
    let updatedDesigns: { design_name: string; price: number }[];

    if (isSelected) {
      updatedOptions = formData.ids.filter((id) => id !== design_id);
      updatedDesigns = formData.nailDesignData.filter(
        (design) => design.design_name !== design_name,
      );
    } else {
      updatedOptions = [...formData.ids, design_id];
      updatedDesigns = [...formData.nailDesignData, { design_name, price }];
    }

    const newSelectedItems = {
      ids: updatedOptions,
      nailDesignData: updatedDesigns,
    };
    setFormdata(newSelectedItems);
    onChange(newSelectedItems); // Notificar al componente padre
  };

  const handleUncheckAll = () => {
    setFormdata({
      ids: [],
      nailDesignData: [],
    });
    onChange({
      ids: [],
      nailDesignData: [],
    });
  };

  // Api
  // Listado de diseño de uñas
  const listNailDesign = async () => {
    setLoading(true);
    if (isAuthenticated && token) {
      try {
        const data = await nailDesignService.listNailService(token);
        setNailDesigns(data);
      } catch (error) {
        console.error(error);
        setError("Error to nail design.");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    listNailDesign();
  }, [isAuthenticated, token]);

  return {
    nailDesigns,
    loading,
    error,
    handleCheckboxChange,
    formData,
    handleUncheckAll,
    listNailDesign,
  };
};
