import { Children, HTMLAttributes } from 'react';

import { getNodeByName } from '../filterNodes';
import { B4hForm } from '../form/form';
import styles from './page.module.scss';

export interface B4hPageLayoutProps extends HTMLAttributes<HTMLElement> {}

const Root = (props: B4hPageLayoutProps) => {
  const { className, children, ...propsCopy } = props;
  const classNames = [className, styles.container].join(' ');

  const childrenArray = Children.toArray(children);

  const title = getNodeByName(childrenArray, Title.name);
  const actions = getNodeByName(childrenArray, Actions.name);
  const content = getNodeByName(childrenArray, [Content.name, B4hForm.name]);

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

export interface B4hPageLayoutTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

const Title = (props: B4hPageLayoutTitleProps) => {
  const { className, ...propsCopy } = props;
  const classNames = [className].join(' ');
  return <h2 {...propsCopy} className={classNames} />;
};

export interface B4hPageLayoutActionsProps extends HTMLAttributes<HTMLElement> {}

const Actions = (props: B4hPageLayoutTitleProps) => {
  const { className, ...propsCopy } = props;
  const classNames = [className, styles.actions].join(' ');
  return <div {...propsCopy} className={classNames} />;
};

export interface B4hPageLayoutContentProps extends HTMLAttributes<HTMLElement> {}

const Content = (props: B4hPageLayoutTitleProps) => {
  const { className, ...propsCopy } = props;
  const classNames = [className].join(' ');
  return <div {...propsCopy} className={classNames} />;
};

export const B4hPageLayout = {
  Root,
  Title,
  Actions,
  Content
};
