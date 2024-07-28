import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button
} from '@chakra-ui/react';
import { useRef } from 'react';
import { B4hModalLayoutBaseProps } from '../layouts/modal';

interface ConfirmAlert extends B4hModalLayoutBaseProps {
  onConfirm: () => Promise<void>;
  children: JSX.Element[];
}

export const ConfirmAlert = ({ isOpen, onClose, onConfirm, children }: ConfirmAlert) => {
  const title = children.find(child => child?.props?.slot === 'title');
  const body = children.find(child => child?.props?.slot === 'body');
  const action = children.find(child => child?.props?.slot === 'action');
  const cancel = children.find(child => child?.props?.slot === 'cancel');

  // #region hooks
  const cancelRef = useRef(null);
  // #endregion

  // #region handlers
  const handleOnClose = () => onClose(false);
  const handleOnConfirm = () => {
    handleOnClose();
    onConfirm();
  };
  // #endregion

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={handleOnClose} size="xs">
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>
          <AlertDialogBody>{body}</AlertDialogBody>
          <AlertDialogFooter>
            <Button variant="outline" ref={cancelRef} onClick={handleOnClose}>
              {cancel}
            </Button>
            <Button colorScheme="red" variant="outline" onClick={handleOnConfirm} ml={3}>
              {action}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
