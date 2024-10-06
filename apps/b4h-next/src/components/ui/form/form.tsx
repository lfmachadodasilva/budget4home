import { forwardRef, HTMLProps } from 'react';
import styles from './form.module.scss';

const Root = forwardRef<HTMLFormElement, HTMLProps<HTMLFormElement>>((props, ref) => {
  return (
    <form {...props} ref={ref} className={styles.form}>
      {props.children}
    </form>
  );
});
Root.displayName = 'B4hForm.Root';

const Actions = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>((props, ref) => (
  <div {...props} ref={ref} className={styles.actions} />
));
Actions.displayName = 'B4hForm.Actions';

const Field = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>((props, ref) => (
  <div {...props} ref={ref} className={styles.field} />
));
Field.displayName = 'B4hForm.Field';

const Input = forwardRef<HTMLInputElement, HTMLProps<HTMLInputElement>>((props, ref) => (
  <input {...props} ref={ref} className={styles.input} />
));
Input.displayName = 'B4hForm.Input';

const TextArea = forwardRef<HTMLTextAreaElement, HTMLProps<HTMLTextAreaElement>>((props, ref) => (
  <textarea {...props} ref={ref} className={styles.input} />
));
TextArea.displayName = 'B4hForm.TextArea';

const Select = forwardRef<HTMLSelectElement, HTMLProps<HTMLSelectElement>>((props, ref) => (
  <select {...props} ref={ref} className={styles.select} />
));
Select.displayName = 'B4hForm.Select';

const Option = forwardRef<HTMLOptionElement, HTMLProps<HTMLOptionElement>>((props, ref) => (
  <option {...props} ref={ref} />
));
Option.displayName = 'B4hForm.Option';

const Label = forwardRef<HTMLLabelElement, HTMLProps<HTMLLabelElement>>((props, ref) => (
  <label {...props} ref={ref} className={styles.label} />
));
Label.displayName = 'B4hForm.Label';

const LabelError = forwardRef<HTMLLabelElement, HTMLProps<HTMLLabelElement>>((props, ref) => (
  <label {...props} ref={ref} className={styles.labelError} />
));
LabelError.displayName = 'B4hForm.LabelError';

export const B4hForm = {
  Root,
  Field,
  Input,
  TextArea,
  Select,
  Option,
  Label,
  LabelError,
  Actions
};
