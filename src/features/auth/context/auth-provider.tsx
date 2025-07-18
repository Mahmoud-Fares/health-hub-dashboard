import { AuthContext } from '@/features/auth/context/auth-context';
import { useAuthManagement } from '@/features/auth/hooks/use-auth-management';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
   const value = useAuthManagement();
   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
