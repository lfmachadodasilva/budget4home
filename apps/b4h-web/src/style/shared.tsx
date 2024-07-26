import { SmallCloseIcon } from '@chakra-ui/icons';
import { chakra } from '@chakra-ui/react';

export const SmallCloseIconStyle = chakra(SmallCloseIcon, {
  baseStyle: {
    cursor: 'pointer'
  }
});

export const B4hForm = chakra('form', {
  baseStyle: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    margin: 0
  }
});
