import { LabelModel } from '@b4h/models';
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { B4hForm } from '../../../style/shared';
import { B4hModalLayout, B4hModalLayoutBaseProps } from '../../layouts/modal';

interface LabelModalProps extends B4hModalLayoutBaseProps {
  label?: LabelModel | null;
}

export const LabelModal = ({ onClose, isOpen, onOpen, label }: LabelModalProps) => {
  // #region hooks
  const [t] = useTranslation();
  // #endregion

  // #region handlers
  const handleAdd = () => onOpen();
  // #endregion

  // #region consts
  const actionText = label ? t('labels.action.edit') : t('labels.action.add');
  const actionIcon = label ? <EditIcon /> : <AddIcon />;
  // #endregion

  return (
    <B4hModalLayout onClose={onClose} isOpen={isOpen} onOpen={onOpen}>
      <slot slot="header">label</slot>
      <slot slot="body">
        <B4hForm>
          <FormControl>
            <FormLabel>{t('labels.icon')}</FormLabel>
            <Input type="text" id="icon" defaultValue={label?.icon} />
          </FormControl>
          <FormControl>
            <FormLabel>{t('labels.name')}</FormLabel>
            <Input type="text" id="name" defaultValue={label?.name} />
          </FormControl>
        </B4hForm>
      </slot>
      <slot slot="footer">
        <Button leftIcon={actionIcon}>{actionText}</Button>
      </slot>
    </B4hModalLayout>
  );
};
