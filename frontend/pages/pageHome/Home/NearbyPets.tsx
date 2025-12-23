import React, { useState } from "react";
import ReportModal from "../../../components/reportModal/ReportModal";
import NearbyPetsList from "../../../components/NearbyPetsList/NearbyPetsList";
import { useNearbyPets } from "../../../hooks/useNearby";

const NearbyPets = () => {
  const { location, pets, loading, error } = useNearbyPets();
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState<null | { id: number; nombre: string }>(null);
  const [petReports, setPetReports] = useState<any[]>([]); // Estado para los reportes
  const [showReports, setShowReports] = useState(false); // Estado para mostrar los reportes

  const handleReportPet = (pet: { id: number; nombre: string }) => {
    setSelectedPet(pet);
    setShowReportModal(true);
  };

  const handleCloseReportModal = () => {
    setShowReportModal(false);
    setSelectedPet(null);
  };

  const handleSubmitReport = async (reportData: { name: string; phone: string; location: string; message?: string }) => {
    if (!selectedPet) return;

    try {
      const res = await fetch(`http://localhost:3000/report/${selectedPet.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reporterName: reportData.name,
          reporterPhone: reportData.phone,
          location: reportData.location,
          message: reportData.message || "",
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error al enviar el reporte");
      }

      alert("Reporte enviado con éxito. ¡Gracias por ayudar!");
    } catch (error: any) {
      alert("Error al enviar el reporte: " + error.message);
    } finally {
      handleCloseReportModal();
    }
  };

  const fetchPetReports = async (petId: number) => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const userId = userData.id; // Asegúrate de que el ID esté en el objeto userData

    try {
      const res = await fetch(`http://localhost:3000/pets/${petId}/reports?userId=${userId}`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error al obtener los reportes");
      }
      const reports = await res.json();
      setPetReports(reports);
      setShowReports(true); // Mostrar los reportes
    } catch (error: any) {
      alert("Error al obtener los reportes: " + error.message);
    }
  };

  return (
    <div>
      <h1>Nearby Pets</h1>
      {loading && <p>Cargando mascotas cercanas...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {location && <p>Ubicación actual: Lat {location.lat}, Lng {location.lng}</p>}
      <NearbyPetsList pets={pets} onReportPet={handleReportPet} onFetchReports={fetchPetReports} />
      {showReportModal && selectedPet && (
        <ReportModal
          petName={selectedPet.nombre}
          onClose={handleCloseReportModal}
          onSubmit={handleSubmitReport}
        />
      )}
      {showReports && (
        <div>
          <h2>Reportes de {selectedPet?.nombre}</h2>
          <ul>
            {petReports.map((report, index) => (
              <li key={index}>
                <p><strong>Nombre:</strong> {report.reporterName}</p>
                <p><strong>Teléfono:</strong> {report.reporterPhone}</p>
                <p><strong>Ubicación:</strong> {report.location}</p>
                <p><strong>Mensaje:</strong> {report.message}</p>
              </li>
            ))}
          </ul>
          <button onClick={() => setShowReports(false)}>Cerrar</button>
        </div>
      )}
    </div>
  );
};

export default NearbyPets;

