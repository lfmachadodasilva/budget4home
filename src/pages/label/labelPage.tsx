import React, { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ItemHeaderComponent } from '../../components/itemHeader/itemHeader';
import { ItemComponent, ItemsComponent } from '../../components/items/items';
import { SearchComponent } from '../../components/search/search';
import { GlobalContext } from '../../contexts/globalContext';
import { LabelFullModel } from '../../models/labelModel';
import { getFullAllLabels } from '../../services/labelService';

export const LabelPage = memo(() => {
  const [t] = useTranslation();
  const { group, month, year } = useContext(GlobalContext);

  const [labels, setLabels] = useState<LabelFullModel[]>([]);
  useEffect(() => {
    getFullAllLabels(group, month, year).then(value => setLabels(value));
  }, [group, month, year]);

  const handleOnAdd = useCallback(() => {}, []);
  const handleOnEdit = useCallback((id: number | string) => {}, []);
  const handleOnDelete = useCallback((id: number | string) => {}, []);

  const labelsItems = useMemo(
    () =>
      labels.map(l => (
        <ItemComponent id={l.id} title={l.name} onEdit={handleOnEdit} onDelete={handleOnDelete}>
          <div className="d-flex justify-content-between">
            <div className="m-1">
              <small>{t('CURRENT_VALUE')}</small>
              <br></br>
              <strong>{l.currValue}</strong>
            </div>
            <div className="m-1">
              <small>{t('LAST_VALUE')}</small>
              <br></br>
              <strong>{l.lastValue}</strong>
            </div>
            <div className="m-1">
              <small>{t('AVERAGE_VALUE')}</small>
              <br></br>
              <strong>{l.avgValue}</strong>
            </div>
          </div>
        </ItemComponent>
      )),
    [labels]
  );

  return (
    <>
      <SearchComponent />
      <ItemHeaderComponent title={t('LABEL')} actionText={t('ADD')} onAction={handleOnAdd} />
      <ItemsComponent>{labelsItems}</ItemsComponent>
    </>
  );
});
