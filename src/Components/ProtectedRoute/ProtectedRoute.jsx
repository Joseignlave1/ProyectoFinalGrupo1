import {Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem('jwt-token');
    //Si no hay toquen navegamos a pagina no autorizada
    if(!token) {
        return <Navigate to="/notAuthorized" />;
    }

    //Si hay token dejamos pasar al hijo
    return children;
}

export default ProtectedRoute;