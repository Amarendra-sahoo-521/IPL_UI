import React, { useState, useEffect } from "react";
import ModalForm from "../../../Core_components/Modal";
import { editPlayerData } from "./api";
import { Bounce, toast, ToastContainer } from "react-toastify";

interface PlayerEditProps {
  data: any;
  onClose: () => void;
}

const PlayerEdit: React.FC<PlayerEditProps> = ({ data, onClose }) => {
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    setShowModal(true);
  }, []);

  const fields = [
    { label: "Name", name: "name", type: "text" },
    // { label: "Base Price", name: "base_price", type: "number" },
    // { label: "Sell Price", name: "sell_price", type: "number" },
    {
      label: "Skill",
      name: "designation",
      type: "select",
      options: [
        { value: "1", label: "Batsman" },
        { value: "2", label: "Bowler" },
        { value: "3", label: "All Rounder" },
      ],
    },
    { label: "From", name: "from", type: "text" },
    // { label: "Debut Year", name: "debut_year", type: "number" },
    { label: "Strike Rate", name: "strike_rate", type: "number" },
    { label: "Match Played", name: "match_played", type: "number" },
    { label: "Economy", name: "economy", type: "text" },
    { label: "Team Buy", name: "team_buy", type: "number" },
    { label: "Runs", name: "runs", type: "number" },
    { label: "Wickets", name: "wickets", type: "number" },
    { label: "Age", name: "age", type: "number" },
    { label: "Photo URL", name: "photo", type: "text" },
    {
      label: "Status",
      name: "status",
      type: "select",
      options: [
        { value: "2", label: "Written" },
        { value: "1", label: "Buy" },
      ],
    },
  ];
  

  const handleFormSubmit = async(updatedData: Record<string, any>) => {
    // console.log("Updated Player Data:", updatedData);
    updatedData.age = updatedData.age ?updatedData.age: 0;
    const res = await editPlayerData(data.id,updatedData)
    res.success ? toast.success(res.message) : toast("Failed") 
    onClose(); 
  };

  return (
    <div>
      {showModal && (
        <ModalForm
          title="Edit Player"
          fields={fields}
          data={data}
          onClose={onClose} 
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default PlayerEdit;
