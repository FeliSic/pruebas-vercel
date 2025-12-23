import React, { useState } from "react";
import MyButton from "components/button/Button";
import MyInput from "components/input/Input";
import cssModal from "./neabyPets.module.css"

interface ReportModalProps {
  petName: string;
  onClose: () => void;
  onSubmit: (reportData: { name: string; phone: string; location: string; message?: string }) => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ petName, onClose, onSubmit }) => {
  const [reporterName, setReporterName] = useState("");
  const [reporterPhone, setReporterPhone] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name: reporterName, phone: reporterPhone, location, message });
    onClose(); // Cierra el modal después de enviar
  };

  return (
    <div className={cssModal.modalStyle}>
      <div className={cssModal.modalContentStyle}>
        <button className={cssModal.closeButtonStyle} onClick={onClose}>
          &times;
        </button>
        <h2 style={{ color: "#5982FF" }}>🐾 Reportar avistaje de {petName}</h2>
        <p style={{ color: "#666", marginBottom: 20 }}>El dueño recibirá un email con tu información de contacto</p>
        <form id="report-form" onSubmit={handleSubmit}>
          <MyInput
            htmlFor="reporterName"
            name="reporterName"
            placeholder="Ej: Juan Pérez"
            type="text"
            onChange={(e) => setReporterName(e.target.value)}
            
          >
            Tu nombre *
          </MyInput>
          <MyInput
            htmlFor="reporterPhone"
            name="reporterPhone"
            placeholder="Ej: +54 9 11 1234-5678"
            type="tel"
            onChange={(e) => setReporterPhone(e.target.value)}
            
          >
            Tu teléfono *
          </MyInput>
          <MyInput
            htmlFor="location"
            name="location"
            placeholder="Ej: Av. Corrientes 1234, CABA"
            type="text"
            onChange={(e) => setLocation(e.target.value)}
            
          >
            ¿Dónde lo viste? *
          </MyInput>
          <MyInput
            htmlFor="message"
            name="message"
            placeholder="Ej: Lo vi cerca del parque, parecía asustado..."
            type="textarea"
            onChange={(e) => setMessage(e.target.value)}
          >
            Mensaje adicional (opcional)
          </MyInput>
          <MyButton type="submit" className="submit-button">
            📧 Enviar reporte
          </MyButton>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;
