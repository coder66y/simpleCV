import { useEffect } from 'react';

export const useScrollIntoView = (id: string, depends: any[]) => {
  useEffect(() => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start',
      });
    }
  }, depends);
};
