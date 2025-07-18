import { NuqsAdapter } from 'nuqs/adapters/react';

import { AuthProvider } from '@/features/auth/context/auth-provider';

import { ThemeProvider } from './theme-provider';

export default function Providers({ children }: { children: React.ReactNode }) {
   return (
      <AuthProvider>
         <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
            <NuqsAdapter>{children}</NuqsAdapter>
         </ThemeProvider>
      </AuthProvider>
   );
}
