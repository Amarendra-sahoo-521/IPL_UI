import React from "react";

type InputProps = {
  label: string;
  type?: "text" | "number" | "email" | "password" | "checkbox" | "radio"; // Extendable input types
  name: string;
  value?: string | number | boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options?: { label: string; value: string | number }[]; // For radio inputs
  placeholder?: string;
};

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  name,
  value='',
  onChange,
  options=[],
  placeholder = "",
}) => {
  return (
    <div className="my-2">
      <label className="block font-medium">{label}</label>
      {type === "radio" && options ? (
        options.map((option) => (
          <label key={option.value} className="mr-3">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className="mr-1"
            />
            {option.label}
          </label>
        ))
      ) : (
        <input
          type={type}
          name={name}
          value={type === "checkbox" ? undefined : (value as string | number | readonly string[] | undefined)}
          checked={type === "checkbox" ? (value as boolean) : undefined}
          onChange={onChange}
          placeholder={placeholder}
          className="border p-2 w-full rounded-md"
        />
      )}
    </div>
  );
};

export default Input;
