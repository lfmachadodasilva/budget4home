import React from 'react';

export interface ItemFooterProps {
  primaryText: string;
  onPrimary: () => void;
  disablePrimary?: boolean;
  secondaryText?: string;
  onSecondary?: () => void;
  disableSecondary?: boolean;
}

export const ItemFooterComponent: React.FC<ItemFooterProps> = React.memo((props: ItemFooterProps) => {
  return (
    <div className="d-flex justify-content-end">
      {props.secondaryText && props.onSecondary && (
        <button
          type="button"
          className="btn btn-secondary"
          onClick={props.onSecondary}
          disabled={props.disableSecondary ?? false}
        >
          {props.secondaryText}
        </button>
      )}
      {props.primaryText && props.onPrimary && (
        <button
          type="button"
          className="btn btn-primary ms-2"
          onClick={props.onPrimary}
          disabled={props.disablePrimary ?? false}
        >
          {props.primaryText}
        </button>
      )}
    </div>
  );
});
