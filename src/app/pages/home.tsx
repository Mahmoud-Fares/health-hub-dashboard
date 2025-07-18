import { Navigate } from 'react-router-dom';

import { useAuth } from '@/features/auth/hooks/use-auth';

export default function Home() {
   const { isLoggedIn } = useAuth();

   if (!isLoggedIn) return <Navigate to='/login' replace />;
   else return <Navigate to='/product' replace />;
}
