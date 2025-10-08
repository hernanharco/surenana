
import { createBrowserRouter } from 'react-router-dom';

// Componentes


// Paginas
import { ClientManager } from '../clientsnew/ClientManager'

export const router = createBrowserRouter([
  {    
    children: [
      {
        index: true,
        element: <ClientManager />, // Por esta parte tenemos el boton + agregar Nuevo Documento
      },     
      {
        path: '/nana/clientnew',
        element: <ClientManager />,
      },     
    ],
  },
]);