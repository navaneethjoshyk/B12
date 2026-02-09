import React from "react";

// The "extends" part is what allows 'disabled', 'type', 'onClick', etc.
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = "primary", 
  className = "", 
  disabled, 
  ...props 
}) => {
  const baseStyles = "transition-all active:scale-95 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[#058177] text-white hover:bg-[#04665e] disabled:bg-neutral-300 disabled:text-neutral-500",
    secondary: "bg-neutral-100 text-neutral-800 hover:bg-neutral-200 disabled:opacity-50",
  };

  return (
    <button
      {...props}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;