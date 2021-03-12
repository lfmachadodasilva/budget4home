import React, { FC, memo, PropsWithChildren, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export interface ItemsProps {}

export const ItemsComponent: React.FC<PropsWithChildren<ItemsProps>> = React.memo(
  (props: PropsWithChildren<ItemsProps>) => {
    return <div className="list-group">{props.children}</div>;
  }
);

export interface ItemProps {
  id: string | number;
  title: string;
  onDelete?: (id: string | number) => void;
  onEdit?: (id: string | number) => void;
}

export const ItemComponent: FC<PropsWithChildren<ItemProps>> = memo((props: PropsWithChildren<ItemProps>) => {
  const [t] = useTranslation();
  const { title, children, onDelete, onEdit } = props;

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
    <div className="list-group-item">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{title}</h5>
        <div className="dropdown">
          <a
            className="btn btn-secondary btn-sm dropdown-toggle"
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {t('ACTIONS')}
          </a>

          <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li>
              <a className="dropdown-item" onClick={() => handleOnEdit(props.id)}>
                {t('EDIT')}
              </a>
            </li>
            <li>
              <a className="dropdown-item" onClick={() => handleOnDelete(props.id)}>
                {t('DELETE')}
              </a>
            </li>
          </ul>
        </div>
      </div>
      {children}
    </div>
  );
});
