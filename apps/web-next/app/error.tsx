'use client';

import { B4hButton } from '@budget4home/ui-components';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <p>Something went wrong!</p>
      <B4hButton onClick={() => location.reload()}>refresh page</B4hButton>
    </div>
  );
}
