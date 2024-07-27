import {
  Center,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import { SmallCloseIconStyle } from '../../style/shared';

export interface B4hModalLayoutBaseProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

interface B4hModalLayoutProps extends B4hModalLayoutBaseProps {
  children: JSX.Element[];
}

export const B4hModalLayout = ({ children, onClose, isOpen }: B4hModalLayoutProps) => {
  const header = children.find(child => child?.props?.slot === 'header');
  const body = children.find(child => child?.props?.slot === 'body');
  const footer = children.find(child => child?.props?.slot === 'footer');

  console.debug('B4hPageTemplate', { header, body });

  return (
    <Modal onClose={onClose} size={{ base: 'full', sm: 'xl' }} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader borderBottomWidth="1px" p={3}>
          <Flex justifyContent="space-between">
            {header}
            <Center>
              <SmallCloseIconStyle onClick={onClose} />
            </Center>
          </Flex>
        </ModalHeader>
        <ModalBody p={3}>{body}</ModalBody>
        {footer && (
          <ModalFooter p={3}>
            <Flex gap={3}>{footer}</Flex>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};
