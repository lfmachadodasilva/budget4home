import * as Dialog from '@radix-ui/react-dialog';
import { ReactNode } from 'react';
import { MdClose } from 'react-icons/md';

import styles from './dialog.module.scss';

export interface B4hDialogProps extends Dialog.DialogProps {
  title?: string;
  description?: string;
  tigger?: ReactNode;
}

export const B4hDialog = (props: B4hDialogProps) => (
  <Dialog.Root {...props}>
    {props.tigger && <Dialog.Trigger asChild>{props.tigger}</Dialog.Trigger>}
    <Dialog.Portal>
      <Dialog.Overlay className={styles.overlay} />

      <Dialog.Content className={styles.content}>
        <div className={styles.header}>
          {props.title && <Dialog.Title className={styles.title}>{props.title}</Dialog.Title>}
          <Dialog.Close asChild style={{ cursor: 'pointer' }}>
            <MdClose size={24} />
          </Dialog.Close>
        </div>
        {props.description && <Dialog.Description>{props.description}</Dialog.Description>}
        {props.children}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
