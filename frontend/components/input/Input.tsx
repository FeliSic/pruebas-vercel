import React from "react";
import inputCss from "./input.module.css"
interface MyInputProps {
  children: React.ReactNode;
  htmlFor: string
  type: string
  name: string
  placeholder?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string; // Agregar esta línea
}


export default function MyInput({ children, htmlFor, type, name, placeholder, onChange, autoComplete }: MyInputProps) {

  return(
    <div>
      <label className={inputCss.LabelStyle} htmlFor={htmlFor}>{children}</label>
      <input className={inputCss.InputStyle} id={htmlFor} type={type} name={name} required placeholder={placeholder} autoComplete={autoComplete} onChange={onChange}  />
    </div>
  )
}


/*

    <form class="profileForm" style="width: 90%; max-width: 500px; display: flex; flex-direction: column; gap: 20px; align-items: center; margin: 80px auto; padding: 30px; border: 1px solid #ccc; border-radius: 8px; background-color: #f9f9f9;">
*/