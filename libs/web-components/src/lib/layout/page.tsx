import { Children, ComponentPropsWithoutRef } from 'react';

import { getNodeByName } from '../filterNodes';
import { B4hForm } from '../form/form';
import styles from './page.module.scss';

export interface B4hPageLayoutProps extends ComponentPropsWithoutRef<'div'> {}

export const B4hPageLayout = (props: B4hPageLayoutProps) => {
  const { className, children, ...propsCopy } = props;
  const classNames = [className, styles.container].join(' ');

  const childrenArray = Children.toArray(children);

  const title = getNodeByName(childrenArray, B4hPageLayoutTitle.name);
  const actions = getNodeByName(childrenArray, B4hPageLayoutActions.name);
  const content = getNodeByName(childrenArray, [B4hPageLayoutContent.name, B4hForm.name]);

  return (
    <div {...propsCopy} className={classNames}>
      <div className={styles.header}>
        {title}
        {actions}
      </div>
      {content}
    </div>
  );
};

export interface B4hPageLayoutTitleProps extends ComponentPropsWithoutRef<'h2'> {}

export const B4hPageLayoutTitle = (props: B4hPageLayoutTitleProps) => {
  const { className, ...propsCopy } = props;
  const classNames = [className].join(' ');
  return <h2 {...propsCopy} className={classNames} />;
};

export interface B4hPageLayoutActionsProps extends ComponentPropsWithoutRef<'div'> {}

export const B4hPageLayoutActions = (props: B4hPageLayoutTitleProps) => {
  const { className, ...propsCopy } = props;
  const classNames = [className, styles.actions].join(' ');
  return <div {...propsCopy} className={classNames} />;
};

export interface B4hPageLayoutContentProps extends ComponentPropsWithoutRef<'div'> {}

export const B4hPageLayoutContent = (props: B4hPageLayoutTitleProps) => {
  const { className, ...propsCopy } = props;
  const classNames = [className].join(' ');
  return <div {...propsCopy} className={classNames} />;
};
