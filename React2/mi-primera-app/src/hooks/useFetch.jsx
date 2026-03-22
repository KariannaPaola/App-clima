/**
 * hook para realizar una peticion a una URL y gestionar los estados de resultado y error.
 *
 * @param url - La URL desde la cual se va a hacer la peticion
 * @returns Un objeto con dos propiedades:
 *   - data: los datos obtenidos en formato JSON
 *   - error: mensaje de error si ocurrio alguno durante la peticion
 */

import {useState, useEffect} from "react";

function useFetch(url){
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;
    fetch(url)
    .then(res => res.json())
    .then((json) => setData(json))
    .catch((err) => setError(err.message))
}, [url]);
return (
  {data, error}
); 
}

export { useFetch };