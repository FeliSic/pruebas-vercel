import { useEffect, useRef } from "react";
import Dropzone from "dropzone";

const useDropzone = (onDrop: (fileUrl: string) => void) => {
  const dropzoneRef = useRef<HTMLDivElement | null>(null);
  const previewRef = useRef<HTMLImageElement | null>(null); // Referencia para la imagen de vista previa

  useEffect(() => {
    const dropzoneElement = dropzoneRef.current;
    const previewElement = previewRef.current;

    if (!dropzoneElement || !previewElement) return; // Asegúrate de que ambos elementos existan

    const dzInstance = new Dropzone(dropzoneElement, {
      url: "https://api.cloudinary.com/v1_1/dwn17shai/image/upload",
      method: "post",
      paramName: "file",
      maxFiles: 1,
      uploadMultiple: false,
      autoProcessQueue: true,
      acceptedFiles: 'image/*',
      addRemoveLinks: true,
      clickable: true,
      dictDefaultMessage: "📷 Arrastrá una imagen o hacé clic",
      dictRemoveFile: "✖ Eliminar",
      init: function() {
        this.on("addedfile", (file) => {
          if (this.files.length > 1) {
            this.removeFile(this.files[0]);
          }
        });

        this.on("thumbnail", (file, dataUrl) => {
          previewElement.src = dataUrl;
          previewElement.style.display = "block";
        });

        this.on("sending", (file, xhr, formData) => {
          formData.append('upload_preset', 'ml_unsigned_upload');
        });

        this.on("success", (file, response: { secure_url: string }) => {
          const imageUrl = response.secure_url;
          console.log("Imagen subida a Cloudinary:", imageUrl);
          onDrop(imageUrl); // Llama a la función onDrop con la URL de la imagen
        });

        this.on("error", (file, errorMessage: any) => {
          const message = typeof errorMessage === "string" ? errorMessage : errorMessage.error?.message || "Error desconocido";
          alert(`Error al subir imagen: ${message}`);
        });
      }
    });

    return () => {
      dzInstance.destroy(); // Destruye la instancia de Dropzone al desmontar el hook
    };
  }, [onDrop]);

  return { dropzoneRef, previewRef }; // Devuelve ambas referencias
};

export default useDropzone;
