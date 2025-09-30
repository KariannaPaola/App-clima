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