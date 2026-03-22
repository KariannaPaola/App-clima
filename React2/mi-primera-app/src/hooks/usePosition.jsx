/**
 * Hook creado para obtener la ubicacion geografica del usuario mediante `navigator.geolocation`
 *
 * @returns Un objeto con dos propiedades:
 *   -localizacion: un objeto con `lat` (latitud) y `lon` (longitud) si la ubicación se obtuvo correctamente
 *   - errorUbicacion: un mensaje de error si hubo algun problema al obtener la ubicacion
 */

import  { useState, useEffect } from 'react';

function usePosition(){
  const [localizacion, setLocalizacion] = useState(null);
  const [errorUbicacion, setError] = useState(null);

  useEffect(() => {
    if(!navigator.geolocation){
      setError("No pudimos acceder a tu localizacion")
      return
    } navigator.geolocation.getCurrentPosition(
    (position)=> setLocalizacion({lat: position.coords.latitude, lon: position.coords.longitude}),
    (err) => setError(err.message));
    },[]);   
    return { localizacion, errorUbicacion };
}

export { usePosition }