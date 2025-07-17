import { Button } from '@/shared/components/ui/button';

export default function App() {
   return (
      <div className='flex h-screen flex-col items-center justify-center gap-4'>
         <h1 className='text-3xl font-bold underline'>Hello world!</h1>
         <Button>Click me</Button>
      </div>
   );
}
