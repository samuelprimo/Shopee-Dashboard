import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import {Login} from './pages/Login/Login';
import {AuthProvider, useAuth } from './contexts/Auth/Auth';
import{

  createBrowserRouter,
  Navigate,  
  RouterProvider,

} from "react-router-dom"
import { NotFound } from './pages/NotFound/NotFound';
import { Perfil } from "./pages/Perfil/Perfil";
import { Sidebar } from './components/Sidebar/Sidebar';
import { Dashboard } from "./pages/Dashboard/Dashboard"
import { Usuarios } from './pages/Usuarios/Usuarios';
import { Graficos } from './pages/Graficos/Graficos';


const ProtectedRoute = ({ element, requiredAccessLevel  }) => {
  const { user } = useAuth();
  if (!user){
    return  <Navigate to="/Login" replace />;
  }
 
  if (requiredAccessLevel && user.access_level !== requiredAccessLevel) {
    return <Navigate to="/NotFound" replace />;
  }

  return element;

};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/Login" />,
    errorElement: <NotFound />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Home",
    element: (
      <ProtectedRoute element={<Sidebar />} />
    ),
    children: [
      {
        path: "Dashboard",
        element: <ProtectedRoute element={<Dashboard />} />,
      },
      {
        path: "Perfil",
        element: <ProtectedRoute element={<Perfil />} />,
      },
      {
        path: "Graficos",
        element: <ProtectedRoute element={<Graficos />} />,
      },
      {
        path: "Usuarios",
        element: <ProtectedRoute element={<Usuarios />}  requiredAccessLevel={1}/>,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  // </React.StrictMode> 
);

