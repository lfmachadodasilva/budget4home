'use client';

import { B4hButton } from '@budget4home/ui-components';
import { ComponentPropsWithoutRef } from 'react';
import { copyToClipboard } from '../../util/copyToClipboard';

export interface CopyToClipboardButtonProps extends ComponentPropsWithoutRef<'button'> {
  value: string;
}
export const CopyToClipboardButton = (props: CopyToClipboardButtonProps) => {
  const handleOnCopy = () => {
    copyToClipboard(props.value);
  };
  return <B4hButton onClick={handleOnCopy} {...props} />;
};
