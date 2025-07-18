import { useContext } from 'react';

import { AuthContext } from '@/features/auth/context/auth-context';

export const useAuth = () => {
   const ctx = useContext(AuthContext);
   if (!ctx) throw new Error('useStore must be used within StoreProvider');
   return ctx;
};
