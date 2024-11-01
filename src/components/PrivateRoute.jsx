import React from 'react'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const token = JSON.parse(localStorage.getItem("token") || null)

    if(token !== null)
        return children;
    else
        return <Navigate to="/login"/>
}

export default PrivateRoute
