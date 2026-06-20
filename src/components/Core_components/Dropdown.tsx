import React from "react";

type OptionType = { label: string; value: string | number };

type DropdownProps = {
  label: string;
  name: string;
  options: OptionType[];
//   value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
};

const Dropdown: React.FC<DropdownProps> = ({
  label,
  name,
  options,
//   value,
  onChange,
  placeholder = "Select an option...",
}) => {
  return (
    <div className="my-2">
      <label className="block font-medium">{label}</label>
      <select
        name={name}
        // value={value}
        onChange={onChange}
        className="border p-2 w-full rounded-md"
      >
        <option value="" >
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
