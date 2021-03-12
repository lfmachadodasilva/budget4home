import React from 'react';

export interface ItemHeaderProps {
  title: string;
  actionText: string;
  onAction: () => void;
  disableAction?: boolean;
}

export const ItemHeaderComponent: React.FC<ItemHeaderProps> = React.memo((props: ItemHeaderProps) => {
  return (
    <div className="d-flex justify-content-between mb-2">
      <h4>{props.title}</h4>
      <button
        type="button"
        className="btn btn-primary"
        onClick={props.onAction}
        disabled={props.disableAction ?? false}
      >
        {props.actionText}
      </button>
    </div>
  );
});
