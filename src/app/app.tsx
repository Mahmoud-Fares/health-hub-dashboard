import { RouterProvider } from 'react-router-dom';

import { Toaster } from '@/shared/components/ui/sonner';

import { router } from '@/app/router';

export default function App() {
   return (
      <>
         <RouterProvider router={router} />
         <Toaster position='top-left' richColors />
      </>
   );
}
