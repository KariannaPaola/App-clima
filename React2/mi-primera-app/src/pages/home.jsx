import React from 'react';
import {useState } from "react";
import { usePosition } from "../hooks/usePosition";
import { useFetch } from "../hooks/useFetch";
import { Inicio } from "../components/Inicio";

const API_key= import.meta.env.VITE_API_KEY;

function ClimaActual() {
  const { localizacion, errorUbicacion } = usePosition();

  const { data, error } = useFetch(
    localizacion
      ? `https://api.openweathermap.org/data/2.5/weather?lat=${localizacion.lat}&lon=${localizacion.lon}&appid=${API_key}&units=metric&lang=es`
      : null
  );

  if (errorUbicacion) {
    return (
      <p className="text-red-500 font-semibold text-center">
        Error de ubicación: {errorUbicacion}
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-red-500 font-semibold text-center">
        Error al obtener el clima
      </p>
    );
  }

  if (!localizacion) {
    return (
      <p className="text-blue-600 dark:text-blue-400 text-center animate-pulse">
        Obteniendo ubicación...
      </p>
    );
  }

  if (!data) {
    return (
      <p className="text-blue-600 dark:text-blue-400 text-center animate-pulse">
        Obteniendo datos del clima...
      </p>
    );
  }

  return (
    <div className="flex flex-col justify-between bg-rose-50 dark:bg-slate-800 w-[420px] h-[320px] p-6 rounded-3xl shadow-xl shadow-blue-900/30">
      <div>
        <p className="text-center font-bold text-lg bg-blue-900 text-white rounded-full py-1 mb-4">
          Tu ubicación actual
        </p>
        <div className="text-center">
          <p className="text-4xl font-bold">
            {Math.round(data.main.temp)}°C
          </p>
          <p className="capitalize text-gray-700 dark:text-gray-300">
            {data.weather[0].description}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Sensación térmica {Math.round(data.main.feels_like)}°C
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 border-t border-gray-300 dark:border-gray-600 pt-4 text-sm">
        <div className="flex flex-col gap-2">
          <p>
            <i className="fa-solid fa-droplet mr-2 text-blue-500"></i>
            Humedad {data.main.humidity}%
          </p>
          <p>
            <i className="fa-solid fa-eye mr-2 text-purple-500"></i>
            Visibilidad {data.visibility} m
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p>
            <i className="fa-solid fa-wind mr-2 text-green-500"></i>
            Viento {data.wind.speed} m/s
          </p>
          <p>
            <i className="fa-solid fa-gauge-simple-high mr-2 text-red-500"></i>
            Presión {data.main.pressure} hPa
          </p>
        </div>
      </div>
    </div>
  );
}

function BuscadorClima(){
  const [ciudad, setciudadBuscada]= useState("");
  const [inputValue, setInputValue] = useState("");
  const { data, error }= useFetch(ciudad ? `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_key}&units=metric&lang=es`: null);
  
  function MostrarResultado() {
  if (!ciudad) return null;

  if (error) {
    return (
      <p className="text-red-500 font-semibold text-center">
        Ocurrió un error al obtener el clima
      </p>
    );
  }

  if (!data) {
    return (
      <p className="text-blue-600 dark:text-blue-400 text-center animate-pulse">
        Cargando clima de <span className="font-semibold">{ciudad}</span>...
      </p>
    );
  }

  if (data.cod === "404") {
    return (
      <p className="text-yellow-600 dark:text-yellow-400 text-center font-medium">
        Ciudad no encontrada
      </p>
    );
  }

  return (
    <div className="flex flex-col justify-between bg-rose-50 dark:bg-slate-800 w-[420px] h-[320px] p-6 rounded-3xl shadow-xl shadow-blue-900/30 transition-all">
      <div>
        <p className="text-center font-bold text-lg bg-blue-800 text-white rounded-full py-1 mb-4">
          {ciudad}
        </p>
        <div className="text-center">
          <p className="text-4xl font-bold">
            {Math.round(data.main.temp)}°C
          </p>
          <p className="capitalize text-gray-700 dark:text-gray-300">
            {data.weather[0].description}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Sensación térmica {Math.round(data.main.feels_like)}°C
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 border-t border-gray-300 dark:border-gray-600 pt-4 text-sm">
        <div className="flex flex-col gap-2">
          <p><i className="fa-solid fa-droplet mr-2 text-blue-500"></i>
            Humedad {data.main.humidity}%
          </p>
          <p><i className="fa-solid fa-eye mr-2 text-purple-500"></i>
            Visibilidad {data.visibility} m
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p><i className="fa-solid fa-wind mr-2 text-green-500"></i>
            Viento {data.wind.speed} m/s
          </p>
          <p><i className="fa-solid fa-gauge-simple-high mr-2 text-red-500"></i>
            Presión {data.main.pressure} hPa
          </p>
        </div>
      </div>
    </div>
  );
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
        {MostrarResultado()} 
      </div>
    </div>
  )
}


export {ClimaActual, BuscadorClima}
