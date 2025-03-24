import React, { useState, useEffect } from "react";
import ModalForm from "../../../Core_components/Modal";
import { editPointData } from "./api";
import { toast,} from "react-toastify";

interface MatchEditProps {
  data: any;
  onClose: () => void;
}

const PointEdit: React.FC<MatchEditProps> = ({ data, onClose }) => {
  const [showModal, setShowModal] = useState(true);
  
  useEffect(() => {
    setShowModal(true);
  }, []);

  const fields = [
    
    { label: "Number of Matchs", name: "match", type: "number" },
    { label: "Number of Wins", name: "win", type: "number" },
    { label: "Number of Lose", name: "lose", type: "number" },
    { label: "Net Run Rate", name: "run_rate", type: "text" },
  ];
  

  const handleFormSubmit = async(updatedData: Record<string, any>) => {
    //  console.log("Updated Player Data:", updatedData);
   
    const res = await editPointData(data.id,updatedData)
    res.success ? toast.success(res.message) : toast("Failed") 
    onClose(); 
  };

  return (
    <div>
      {showModal && (
        <ModalForm
          title="Edit Points"
          fields={fields}
          data={data}
          onClose={onClose} 
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default PointEdit;
