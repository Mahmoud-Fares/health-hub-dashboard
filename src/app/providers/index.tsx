import { NuqsAdapter } from 'nuqs/adapters/react';

import { ThemeProvider } from './theme-provider';

export default function Providers({ children }: { children: React.ReactNode }) {
   return (
      <>
         <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
            <NuqsAdapter>{children}</NuqsAdapter>
         </ThemeProvider>
      </>
   );
}
