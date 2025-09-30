import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BuscadorClima, ClimaActual} from './pages/home';
import { BtnDark } from './components/BtnDark';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BuscadorClima/>
    <ClimaActual/>
    <BtnDark/>
  </StrictMode>
)


