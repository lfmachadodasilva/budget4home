import { ArrowLeftIcon } from '@radix-ui/react-icons';
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { forwardRef, HTMLProps, InputHTMLAttributes, useState } from 'react';
import { B4hButton } from '../button/button';
import { B4hFade } from '../fade';
import styles from './form.module.scss';

const Root = forwardRef<HTMLFormElement, HTMLProps<HTMLFormElement>>((props, ref) => {
  return (
    <form {...props} ref={ref} className={styles.form}>
      {props.children}
    </form>
  );
});
Root.displayName = 'B4hForm.Root';

const Title = forwardRef<HTMLHeadingElement, HTMLProps<HTMLHeadingElement>>((props, ref) => (
  <h1 {...props} ref={ref} />
));
Title.displayName = 'B4hForm.Title';

const Return = (props: HTMLProps<HTMLHeadingElement>) => (
  <Link href={props.href as string}>
    <ArrowLeftIcon className={styles.return} />
  </Link>
);
Return.displayName = 'B4hForm.Return';

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

interface EmojiProps extends InputHTMLAttributes<HTMLInputElement> {
  setEmoji: (value: string) => void;
}
const Emoji = forwardRef<HTMLInputElement, EmojiProps>((props, ref) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { setEmoji, ...propsCopy } = props; // Destructure setEmoji from props

  const handleEmojiSelect = (event: { emoji: string }) => {
    props.setEmoji(event.emoji);
    setShowEmojiPicker(false);
  };
  const openCloseEmojiPicker = () => setShowEmojiPicker(x => !x);

  return (
    <>
      <div className={styles.emoji}>
        <input {...propsCopy} ref={ref} className={styles.input} />
        <B4hButton type="button" onClick={openCloseEmojiPicker}>
          😀
        </B4hButton>
      </div>

      <EmojiPicker
        onEmojiClick={handleEmojiSelect}
        theme={Theme.DARK}
        width={'100%'}
        open={showEmojiPicker}
        reactionsDefaultOpen={false}
        autoFocusSearch={false}
      />
    </>
  );
});
Emoji.displayName = 'B4hForm.Emoji';

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

const LabelError = forwardRef<HTMLLabelElement, HTMLProps<HTMLLabelElement>>((props, ref) => {
  return (
    <AnimatePresence>
      {props.children && (
        <B4hFade direction="right">
          <label {...props} ref={ref} className={styles.labelError} />
        </B4hFade>
      )}
    </AnimatePresence>
  );
});
LabelError.displayName = 'B4hForm.LabelError';

export const B4hForm = {
  Root,
  Title,
  Return,
  Field,
  Input,
  Emoji,
  TextArea,
  Select,
  Option,
  Label,
  LabelError,
  Actions
};
