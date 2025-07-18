import { useEffect, useState } from 'react';

export const useAuthManagement = () => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);

   useEffect(() => {
      const token = localStorage.getItem('token-healthUp-admin');

      if (token) setIsLoggedIn(true);
      else setIsLoggedIn(false);
   }, [isLoggedIn]);

   return {
      isLoggedIn,
      setIsLoggedIn,
   };
};
