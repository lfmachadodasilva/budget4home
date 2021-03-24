import React, { FC, memo, PropsWithChildren, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { LoadingComponent } from '../loading/loading';

export type ItemsProps = {
  isLoading: boolean;
};

export const ItemsComponent: React.FC<PropsWithChildren<ItemsProps>> = React.memo(
  (props: PropsWithChildren<ItemsProps>) => {
    return (
      <div className="list-group mb-4">
        <LoadingComponent isLoading={props.isLoading}>{props.children}</LoadingComponent>
      </div>
    );
  }
);

export interface ItemProps {
  id: string | number;
  title: string | JSX.Element;
  subTitle?: string | JSX.Element;
  onDelete?: (id: string | number) => void;
  onEdit?: (id: string | number) => void;
}

export const ItemComponent: FC<PropsWithChildren<ItemProps>> = memo((props: PropsWithChildren<ItemProps>) => {
  const [t] = useTranslation();
  const { id, title, subTitle, children, onDelete, onEdit } = props;

  const handleOnEdit = useCallback(
    (id: number | string) => {
      onEdit && onEdit(id);
    },
    [onEdit]
  );
  const handleOnDelete = useCallback(
    (id: number | string) => {
      onDelete && onDelete(id);
    },
    [onDelete]
  );

  return (
    <div key={id} className="list-group-item px-2">
      <div className="d-flex justify-content-between">
        <div className="d-flex justify-content-start align-items-center">
          <h5 className="mb-2">{title}</h5>
          {subTitle && <small className="mb-1 mx-2">{subTitle}</small>}
        </div>
        <div className="dropdown">
          <button className="btn btn-secondary btn-sm dropdown-toggle" id="dropdown-menu" data-bs-toggle="dropdown" />

          <ul className="dropdown-menu" aria-labelledby="dropdown-menu">
            <li>
              <button className="dropdown-item" onClick={() => handleOnEdit(props.id)}>
                {t('EDIT')}
              </button>
            </li>
            <li>
              <button className="dropdown-item" onClick={() => handleOnDelete(props.id)}>
                {t('DELETE')}
              </button>
            </li>
          </ul>
        </div>
      </div>
      {children}
    </div>
  );
});
