import { Navigate, Outlet, ScrollRestoration } from 'react-router-dom';

import { useAuth } from '@/features/auth/hooks/use-auth';

import MainLayout from '@/app/layouts/main-layout';

export default function AuthLayout() {
   const { isLoggedIn } = useAuth();

   if (!isLoggedIn) return <Navigate to='/login' replace />;

   return (
      <>
         <ScrollRestoration />

         <MainLayout>
            <Outlet />
         </MainLayout>
      </>
   );
}
