import {
  Center,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue
} from '@chakra-ui/react';
import { SmallCloseIconStyle } from '../../style/shared';

export interface B4hModalLayoutBaseProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: (refresh?: boolean) => void;
}

interface B4hModalLayoutProps extends B4hModalLayoutBaseProps {
  children: JSX.Element[];
}

export const B4hModalLayout = ({ children, onClose, isOpen }: B4hModalLayoutProps) => {
  const bg = useColorModeValue(undefined, 'gray.800');

  const header = children.find(child => child?.props?.slot === 'header');
  const body = children.find(child => child?.props?.slot === 'body');
  const footer = children.find(child => child?.props?.slot === 'footer');

  const handleOnClose = () => onClose(false);

  // console.debug('B4hPageTemplate', { header, body });

  return (
    <Modal onClose={onClose} size={{ base: 'full', sm: 'xl' }} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent bg={bg}>
        <ModalHeader borderBottomWidth="1px" p={3}>
          <Flex justifyContent="space-between">
            {header}
            <Center>
              <SmallCloseIconStyle onClick={handleOnClose} />
            </Center>
          </Flex>
        </ModalHeader>
        <ModalBody p={3}>{body}</ModalBody>
        {footer && (
          <ModalFooter p={3} gap={3} justifyContent="flex-end">
            {footer}
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};
