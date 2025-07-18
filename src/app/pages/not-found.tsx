import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

export default function NotFound() {
   const navigate = useNavigate();

   return (
      <div className='flex min-h-screen items-center justify-center p-4'>
         <div className='space-y-4 text-center'>
            <h1 className='text-4xl font-bold text-destructive'>
               404 Not Found
            </h1>
            <p className='text-lg font-semibold text-muted-foreground'>
               The page you are looking for does not exist
            </p>
            <div className='flex justify-center gap-4 pt-4'>
               <Button
                  onClick={() =>
                     navigate('/', { replace: true, viewTransition: true })
                  }
               >
                  Go Home
               </Button>
            </div>
         </div>
      </div>
   );
}
