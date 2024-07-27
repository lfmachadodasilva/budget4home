import { LabelModel } from '@b4h/models';
import { AddIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Button, Center, chakra, Flex, Spacer, Text, useDisclosure } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LabelModal } from '../components/labels/labelModal';
import { LoadingData } from '../components/loadingData';
import { B4hApiRoutes } from '../config/routes';
import { B4hPageLayout } from '../layouts/pageBase';

export const LabelsPage = () => {
  // #region hooks
  const [t] = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isPending, error, data } = useQuery<LabelModel[], Error>({
    queryKey: ['getLabels'],
    queryFn: () => fetch(B4hApiRoutes.labels).then(res => res.json())
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
  // #endregion

  console.log('LabelsPage', { fetch: { url: B4hApiRoutes.labels, isPending, error, data } });

  return (
    <>
      <B4hPageLayout title={t('labels.title')}>
        <slot slot="header">{t('labels.title')}</slot>
        <slot slot="body">
          <LoadingData isLoading={isPending} />
          <Flex direction="column">
            {data?.map(label => (
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
      <LabelModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} label={selectedLabel} />
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
