import { Children, ComponentPropsWithoutRef, FormHTMLAttributes, memo } from 'react';
import { getAndRemoveNode } from '../filterNodes';
import styles from './form.module.scss';

export interface B4hFormProps extends FormHTMLAttributes<HTMLFormElement> {}

export const B4hForm = memo((props: B4hFormProps) => {
  const { className, children, ...propsCopy } = props;

  const classNames = [className, styles.container].join(' ');

  const childrenArray = Children.toArray(children);
  const actions = getAndRemoveNode(childrenArray, B4hFormActions.name);

  return (
    <form {...propsCopy} className={classNames}>
      {childrenArray}
      {actions}
    </form>
  );
});

export interface B4hFormActionsProps extends ComponentPropsWithoutRef<'div'> {}

export const B4hFormActions = (props: B4hFormActionsProps) => {
  const { className, ...propsCopy } = props;
  const classNames = [className, styles.actions].join(' ');
  return (
    <div {...propsCopy} className={classNames}>
      {props.children}
    </div>
  );
};
