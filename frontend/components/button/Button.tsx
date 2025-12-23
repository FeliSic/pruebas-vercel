import React from "react";



interface MyButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset"; // Agregamos el type como opcional
  className?: string;
  id?: string
}

export default function MyButton({ children, onClick, type = "button", className, id }: MyButtonProps) {
  return (
    <button type={type} onClick={onClick} className={className} id={id}>
      {children}
    </button>
  );
}