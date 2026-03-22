/**
 * @component
 * Componente para buscar una ciudad.
 * 
 * Muestra un input y un botón con icono de bssqueda
 * 
 * @param value - Valor actual input 
 * @param onChange - Funcion que se ejecuta al cambiar el texto del input.
 * @param onBuscar - Funcion que se ejecuta al hacer click en el boton de busqueda.
 *
 * @returns html con boton de busqueda para ingresar ciudades
 */

function Inicio({value,onChange,onBuscar}){
  return (
  <div className="flex items-center w-[420px] bg-white dark:bg-gray-900 border border-blue-800/70 rounded-full px-4 py-2 shadow-lg shadow-blue-900/20 transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-blue-600">

    <input
      type="text"
      placeholder="Buscar una ciudad..."
      value={value}
      onChange={onChange}
      className="flex-1 bg-transparent outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400 text-sm"
    />

    <button
      onClick={onBuscar}
      className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-800 hover:bg-blue-700 active:scale-95 transition-all duration-200 text-white">
      <i className="fa-solid fa-magnifying-glass text-sm"></i>
    </button>

  </div>
);
}

export{ Inicio };