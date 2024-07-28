import { LabelModel } from '@b4h/models';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { B4hForm } from '../../../style/shared';
import { addLabelFetch, deleteLabelFetch, updateLabelFetch } from '../../clients/label';
import { TOAST_DURATION } from '../../config/constants';
import { ValidationLenght, ValidationRequired } from '../../config/validations';
import { B4hModalLayout, B4hModalLayoutBaseProps } from '../../layouts/modal';
import { ErrorAlert } from '../errorAlert';

interface LabelModalProps extends B4hModalLayoutBaseProps {
  label?: LabelModel | null;
}

export const LabelModal = ({ onClose, isOpen, onOpen, label }: LabelModalProps) => {
  // #region hooks
  const [t] = useTranslation();
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset
  } = useForm<LabelModel>();
  useEffect(() => {
    if (isOpen) {
      reset();
      addMudation.reset();
      updateMudation.reset();
      deleteMutation.reset();
    }
  }, [isOpen]);
  // #endregion

  // #region fetch
  const addMudation = useMutation<LabelModel, Error, LabelModel>({
    mutationKey: ['addLabel'],
    mutationFn: async (label: LabelModel) => addLabelFetch('1', label)
  });
  const updateMudation = useMutation<void, Error, LabelModel>({
    mutationKey: ['updateLabel'],
    mutationFn: async (label: LabelModel) => updateLabelFetch('1', label.id, label)
  });
  const deleteMutation = useMutation<void, Error, string>({
    mutationKey: ['deleteLabel'],
    mutationFn: async (labelId: string) => deleteLabelFetch('1', labelId)
  });
  // #endregion

  // #region handlers
  const handleOnSubmit = async (values: LabelModel) => {
    try {
      if (label) {
        await updateMudation.mutateAsync(values);
      } else {
        await addMudation.mutateAsync(values);
      }
      onClose(true);
      toast({
        description: label ? t('labels.toast.updateDescription') : t('labels.toast.addDescription'),
        status: 'success',
        duration: TOAST_DURATION,
        isClosable: true
      });
    } catch (err) {
      console.error(err);
    }
  };
  const handleOnDelete = async () => {
    try {
      await deleteMutation.mutateAsync(label?.id as string);
      onClose(true);
      toast({
        description: t('labels.toast.deleteDescription'),
        status: 'success',
        duration: TOAST_DURATION,
        isClosable: true
      });
    } catch (err) {
      console.error(err);
    }
  };
  // #endregion

  // #region consts
  const actionText = label ? t('labels.action.edit') : t('labels.action.add');
  const actionIcon = label ? <EditIcon /> : <AddIcon />;
  // #endregion

  return (
    <B4hModalLayout onClose={onClose} isOpen={isOpen} onOpen={onOpen}>
      <slot slot="header">{t('labels.title')}</slot>
      <slot slot="body">
        <B4hForm onSubmit={handleSubmit(handleOnSubmit)} id="label-form-modal">
          <FormControl isInvalid={!!errors.icon}>
            <FormLabel htmlFor="icon">{t('labels.icon')}</FormLabel>
            <Input
              type="text"
              id="icon"
              defaultValue={label?.icon}
              placeholder={t('labels.iconPlaceholder')}
              {...register('icon', {
                ...ValidationRequired(),
                ...ValidationLenght(1, 10)
              })}
            />
            <FormErrorMessage>{errors?.icon?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.name}>
            <FormLabel htmlFor="name">{t('labels.name')}</FormLabel>
            <Input
              type="text"
              id="name"
              defaultValue={label?.name}
              placeholder={t('labels.namePlaceholder')}
              {...register('name', { ...ValidationRequired(), ...ValidationLenght(3, 20) })}
            />
            <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
          </FormControl>

          <ErrorAlert show={!!addMudation.error || !!deleteMutation.error} />
        </B4hForm>
      </slot>
      <slot slot="footer">
        {label && (
          <Button
            colorScheme="red"
            variant="outline"
            isLoading={deleteMutation.isPending}
            leftIcon={<DeleteIcon />}
            onClick={handleOnDelete}
            loadingText={t('labels.action.delete')}
            isDisabled={isSubmitting || addMudation.isPending}
          >
            {t('labels.action.delete')}
          </Button>
        )}
        <Button
          isLoading={isSubmitting || addMudation.isPending}
          leftIcon={actionIcon}
          type="submit"
          form="label-form-modal"
          loadingText={actionText}
          isDisabled={deleteMutation.isPending}
        >
          {actionText}
        </Button>
      </slot>
    </B4hModalLayout>
  );
};
