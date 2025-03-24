import React from "react";

interface ModalFormProps {
  title: string;
  fields: { label: string; name: string; type: string; options?: { value: string | number; label: string }[] }[];
  data: Record<string, any>;
  onClose: () => void;
  onSubmit: (updatedData: Record<string, any>) => void;
}

const ModalForm: React.FC<ModalFormProps> = ({ title, fields, data, onClose, onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const updatedData = Object.fromEntries(formData.entries());
    onSubmit(updatedData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-3/5 p-6"> {/* Increased width to 60% (w-3/5) */}
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-4"> {/* Grid with 3 columns */}
            {fields.map((field, index) => (
              <div key={index} className="flex flex-col">
                <label className="block text-sm font-medium mb-1">{field.label}</label>
                {field.type === "select" ? (
                  <select
                    name={field.name}
                    defaultValue={data[field.name]}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  >
                    {field.options?.map((option, i) => (
                      <option key={i} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    defaultValue={data[field.name]}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
