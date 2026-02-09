import React from "react";

// Add 'error' to your interface here
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string; // The '?' means it's optional
}

const Input: React.FC<InputProps> = ({ label, error, className = "", ...props }) => {
  return (
    <div className="flex flex-col w-full text-left">
      <label className="text-sm font-semibold text-neutral-700 mb-2">
        {label}
      </label>
      <input
        {...props}
        className={`border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all 
          ${error ? "border-red-500 focus:ring-red-500" : "border-neutral-300 focus:ring-[#058177]"} 
          ${className}`}
      />
      
      {/* 2. Display the error message if it exists */}
      {error && (
        <span className="text-red-500 text-xs mt-1 font-medium">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;