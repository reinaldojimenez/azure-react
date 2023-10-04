import React, { useEffect, useState } from 'react';

const ImageB64 = ({ base64String }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Decodificar la cadena Base64
    const decodedImage = atob(base64String);

    // Crear un array de bytes
    const byteNumbers = new Array(decodedImage.length);
    for (let i = 0; i < decodedImage.length; i++) {
      byteNumbers[i] = decodedImage.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // Crear un blob a partir del array de bytes
    const blob = new Blob([byteArray], { type: 'image/jpeg' });

    // Crear una URL de objeto (blob)
    const blobUrl = URL.createObjectURL(blob);

    setImageUrl(blobUrl);

    // Limpiar la URL de objeto cuando el componente se desmonta
    return () => URL.revokeObjectURL(blobUrl);
  }, [base64String]);

  return (
    <div>
      {imageUrl ? (
        //<img src={imageUrl} alt="Imagen" width={500} height={500}/>
        <img src={imageUrl} alt="Imagen"/>
      ) : (
        <p>Generando QR...</p>
      )}
    </div>
  );
};

export default ImageB64;