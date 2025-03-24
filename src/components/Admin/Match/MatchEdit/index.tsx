import React, { useState, useEffect } from "react";
import ModalForm from "../../../Core_components/Modal";
import { editmatchData } from "./api";
import { toast,} from "react-toastify";

interface MatchEditProps {
  data: any;
  onClose: () => void;
}

const MatchEdit: React.FC<MatchEditProps> = ({ data, onClose }) => {
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    setShowModal(true);
  }, []);

  const fields = [
    {
      label: "Who Win",
      name: "wonTeam",
      type: "select",
      options: [
        { value: "1", label: "Home Team" },
        { value: "2", label: "Away Team" },
        { value: "0", label: "Draw" },
      ],
    },
    { label: "Home Team Score", name: "homeTeamScore", type: "text" },
    { label: "Away Team Score", name: "awayTeamScore", type: "text" },
    { label: "Win Description", name: "win_desc", type: "text" },
  ];
  

  const handleFormSubmit = async(updatedData: Record<string, any>) => {
    //  console.log("Updated Player Data:", updatedData);
    updatedData.wonTeam = updatedData.wonTeam == 0 ? 0 : updatedData.wonTeam == 1 ? data.homeTeam: data.awayTeam;
    const res = await editmatchData(data.id,updatedData)
    res.success ? toast.success(res.message) : toast("Failed") 
    onClose(); 
  };

  return (
    <div>
      {showModal && (
        <ModalForm
          title="Edit Match"
          fields={fields}
          data={data}
          onClose={onClose} 
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default MatchEdit;
