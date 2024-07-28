import { LabelModel } from '@b4h/models';
import { AddIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Button, Center, chakra, Flex, Spacer, Text, useDisclosure } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getLabelsFetch } from '../clients/label';
import { LabelModal } from '../components/labels/labelModal';
import { LoadingData } from '../components/loadingData';
import { B4hApiRoutes } from '../config/routes';
import { B4hPageLayout } from '../layouts/page';

export const LabelsPage = () => {
  // #region hooks
  const [t] = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const getQuery = useQuery<LabelModel[], Error>({
    queryKey: ['getLabels'],
    queryFn: () => getLabelsFetch('1')
  });
  const [selectedLabel, setSelectedLabel] = useState<LabelModel | null>();
  // #endregion

  // #region handlers
  const handleAdd = () => {
    setSelectedLabel(null);
    onOpen();
  };
  const handleSelectLabel = (label: LabelModel) => {
    setSelectedLabel(label);
    onOpen();
  };
  const handleOnClose = (refresh?: boolean) => {
    refresh && getQuery.refetch();
    onClose();
  };
  // #endregion

  console.debug('LabelsPage', { fetch: { url: B4hApiRoutes.labels, getQuery } });

  return (
    <>
      <B4hPageLayout title={t('labels.title')}>
        <slot slot="header">{t('labels.title')}</slot>
        <slot slot="body">
          <LoadingData isLoading={getQuery.isPending || getQuery.isFetching} />
          <Flex direction="column">
            {getQuery.data?.map(label => (
              <ItemStyle
                gap={3}
                p={3}
                key={`label_${label.id}`}
                onClick={() => handleSelectLabel(label)}
              >
                {label.icon && label.icon}
                <Text size="sm">{label.name}</Text>
                <Spacer />
                <Center>
                  <ChevronRightIcon />
                </Center>
              </ItemStyle>
            ))}
          </Flex>
        </slot>
        <slot slot="actionTop">
          <Button isLoading={isOpen} leftIcon={<AddIcon />} onClick={handleAdd}>
            {t('labels.action.add')}
          </Button>
        </slot>
      </B4hPageLayout>
      <LabelModal isOpen={isOpen} onClose={handleOnClose} onOpen={onOpen} label={selectedLabel} />
    </>
  );
};

export const ItemStyle = chakra(Flex, {
  baseStyle: {
    cursor: 'pointer',
    _hover: {
      backgroundColor(theme) {
        return theme.colors.primary[300];
      },
      borderRadius: '0.5rem'
    },
    _focus: {
      backgroundColor(theme) {
        return theme.colors.primary[300];
      }
    }
  }
});
