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