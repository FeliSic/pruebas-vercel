import React from "react";

interface Pet {
  id: number;
  nombre: string;
  bio: string;
  location: { lat: number; lng: number };
  status: string;
  img: string;
}

interface NearbyPetsListProps {
  pets: Pet[];
  onReportPet: (pet: Pet) => void;
  onFetchReports: (petId: number) => void; // Nueva prop para obtener reportes
}

const NearbyPetsList: React.FC<NearbyPetsListProps> = ({ pets, onReportPet, onFetchReports }) => {
  return (
    <div>
      <h2>Mascotas cercanas</h2>
      {pets.length === 0 ? (
        <p>No hay mascotas cercanas reportadas.</p>
      ) : (
        <ul>
          {pets.map((pet) => (
            <li key={pet.id} style={{ marginBottom: 20, border: "1px solid #ccc", padding: 10, borderRadius: 5 }}>
              <h3>{pet.nombre}</h3>
              <p>{pet.bio}</p>
              <p>Última ubicación: Lat {pet.location.lat}, Lng {pet.location.lng}</p>
              <p>Status: {pet.status}</p>
              {pet.img && <img src={pet.img} alt={pet.nombre} style={{ width: 100, height: 100 }} />}
              <button onClick={() => onReportPet(pet)} style={{ marginTop: 10 }}>
                Reportar avistaje
              </button>
              <button onClick={() => onFetchReports(pet.id)} style={{ marginTop: 10, marginLeft: 10 }}>
                Ver reportes
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NearbyPetsList;

