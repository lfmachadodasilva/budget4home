'use client';

import { useState } from 'react';

export interface UseDisclosureProps {
  isOpen: boolean;
  isClose: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

export const useDisclosure = (): UseDisclosureProps => {
  const [open, setOpen] = useState(false);

  const onClose = () => setOpen(false);
  const onOpen = () => setOpen(true);
  const onToggle = () => setOpen(open => !open);

  return {
    isOpen: open,
    isClose: !open,
    onOpen: onOpen,
    onClose: onClose,
    onToggle: onToggle
  };
};
