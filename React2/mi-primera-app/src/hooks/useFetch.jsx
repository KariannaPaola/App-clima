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