import React from 'react';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

function Auth() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if(pathname.startsWith("/protected")){
            navigate('/login');
        }
    }, [pathname]);

  return (
    <div>
        <Outlet />
    </div>
  )
}

export default Auth;