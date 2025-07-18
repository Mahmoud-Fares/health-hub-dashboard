import { createContext } from 'react';

import { useAuthManagement } from '@/features/auth/hooks/use-auth-management';

type ContextType = ReturnType<typeof useAuthManagement>;

export const AuthContext = createContext<ContextType | undefined>(undefined);
