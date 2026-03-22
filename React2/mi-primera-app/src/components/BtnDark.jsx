/**
 * Componente que realiza un boton para alternar entre el modo oscuro y el modo claro en la aplicacion
 * @component
 * Utiliza el hook useState para controlar el estado dark.Cuando dark es verdadero, se añade la clase dark, activando el tema oscuro en Tailwind.
 * Cuando es falso, se elimina dicha clase para volver al modo claro
 * @returns un boton que permite cambiar entre el modo claro y oscuro.
 */

import { useState} from "react"

function BtnDark() {
  const [dark, setdark]=useState(false)

  if(dark){
    document.documentElement.classList.add("dark")
  }else{
    document.documentElement.classList.remove("dark")}

  return(
    <div className="flex flex-col gap-[20px] font-bold">
      <button onClick={() => setdark(!dark)}>Cambiar a modo {dark ? "claro ☀️": "oscuro 🌖"} </button>
    </div>
  )
}

export{BtnDark}