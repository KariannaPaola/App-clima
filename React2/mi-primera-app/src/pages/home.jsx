import {useState , useEffect} from "react";
import { usePosition } from "../hooks/usePosition";
import { useFetch } from "../hooks/useFetch";
import { Inicio } from "../components/Inicio";


const API_key= "82fc940742fb28109bf3655b0a95f776";

function ClimaActual(){
const { localizacion, errorUbicacion } = usePosition();
const { data, error }= useFetch(localizacion ? `https://api.openweathermap.org/data/2.5/weather?lat=${localizacion.lat}&lon=${localizacion.lon}&appid=${API_key}&units=metric&lang=es`: null);

if (error) {return <p>Error: {error}</p>}
if (errorUbicacion){return <p>Error: {errorUbicacion}</p>}
if (!localizacion){return <p>Cargando ubicacion...</p>} 
if (!data){return <p>Obteniendo datos del clima</p>}
else{
  return(
    <div className=" flex flex-col justify-around bg-rose-50 dark:bg-slate-900 w-[400px] h-[300px] p-[20px] rounded-[30px]">
      <div className="flex flex-col">
        <p className="font-bold bg-blue-900 p-[5px]">Your Location</p>
        <div>
          <p className="text-2xl font-bold">{data.main.temp}°C </p>
          <p>{data.weather[0].description}</p>
          <p className="text-sm">Feels like {data.main.feels_like}°C</p>
        </div>
      </div>
      <div className="grid grid-cols-2 border-t border-gray-600 border-solid p-[10px] ">
        <div className="flex flex-col gap-[10px]">
          <p className="text-sm"> <i class="fa-solid fa-droplet"></i> Humidity {data.main.humidity}% </p>
          <p className="text-sm"> <i class="fa-solid fa-eye"></i> Visibility {data.visibility}m</p>
        </div>
        <div className="flex flex-col gap-[10px]">
          <p className="text-sm"><i class="fa-solid fa-wind"></i> Wind {data.wind.speed}m/s</p>
          <p className="text-sm"><i class="fa-solid fa-gauge-simple-high"></i> Pressure {data.main.pressure}hPa</p>
        </div>
      </div>
    </div>
    )
  } 
}

function BuscadorClima(){
  const [ciudad, setciudadBuscada]= useState("");
  const [inputValue, setInputValue] = useState("");
  const { data, error }= useFetch(ciudad ? `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_key}&units=metric&lang=es`: null);
  
  function MostarResultado() {
      if (ciudad && error){
        return <p>Error</p>
      }if(ciudad && !data){
        return <p>Cargando clima de {ciudad}...</p>
      }if (ciudad && data && data.cod === "404"){
        return <p>Ciudad no encontrada</p>
      }if (ciudad && data && data.cod !== "404"){
        return(
      <div className=" flex flex-col justify-around bg-rose-50 dark:bg-slate-700 w-[400px] h-[300px] p-[20px] rounded-[30px]">
        <div className="flex flex-col">
          <p className="font-bold bg-blue-800 p-[5px]">{ciudad}</p>
          <div>
            <p className="text-2xl font-bold">{data.main.temp}°C </p>
            <p>{data.weather[0].description}</p>
            <p className="text-sm">Feels like {data.main.feels_like}°C</p>
          </div>
        </div>
        <div className="grid grid-cols-2 border-t border-gray-600 border-solid p-[10px]">
          <div className="flex flex-col gap-[10px]">
            <p className="text-sm"> <i class="fa-solid fa-droplet"></i> Humidity {data.main.humidity}% </p>
            <p className="text-sm"> <i class="fa-solid fa-eye"></i> Visibility {data.visibility}m</p>
          </div>
          <div className="flex flex-col gap-[10px]">
            <p className="text-sm"><i class="fa-solid fa-wind"></i> Wind {data.wind.speed}m/s</p>
            <p className="text-sm"><i class="fa-solid fa-gauge-simple-high"></i> Pressure {data.main.pressure}hPa</p>
          </div>
        </div>
      </div>)
      }
    }
  return(
    <div className="flex flex-col gap-[20px]">
      <div>
        <Inicio
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onBuscar={() => setciudadBuscada(inputValue)}/>  
      </div>
      <div>
        {MostarResultado()} 
      </div>
    </div>
  )
}




export {ClimaActual, BuscadorClima}
