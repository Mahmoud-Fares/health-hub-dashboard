import { Moon, Sun } from 'lucide-react';
import { flushSync } from 'react-dom';

import { Toggle } from '@/shared/components/ui/toggle';
import { useTheme } from '@/shared/hooks/ui/use-theme';
import { cn } from '@/shared/lib/utils';

export function ThemeToggler({ className }: { className?: string }) {
   const { theme, setTheme } = useTheme();

   const handleSmoothThemeChange = () => {
      const root = document.documentElement;
      root.style.viewTransitionName = 'theme-transition';

      document
         .startViewTransition(() =>
            flushSync(() => setTheme(theme === 'dark' ? 'light' : 'dark'))
         )
         .finished.finally(() => {
            root.style.viewTransitionName = '';
         });
   };

   return (
      <div className={cn(className)}>
         <Toggle
            variant='ghost'
            className='group size-9'
            onPressedChange={handleSmoothThemeChange}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            pressed={theme === 'dark'}
         >
            <Moon
               size={16}
               strokeWidth={2}
               className='shrink-0 scale-0 opacity-0 transition-all dark:scale-100 dark:opacity-100'
               aria-hidden='true'
            />
            <Sun
               size={16}
               strokeWidth={2}
               className='absolute shrink-0 scale-100 opacity-100 transition-all dark:scale-0 dark:opacity-0'
               aria-hidden='true'
            />
         </Toggle>
      </div>
   );
}
