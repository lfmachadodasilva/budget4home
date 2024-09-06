import { LabelModel } from '@b4h/models';
import { B4hButton, B4hForm, B4hInput } from '@b4h/web-components';
import { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { B4hRoutes } from '../../../shared/routes';

export const LabelForm = ({ label }: { label?: LabelModel | null }) => {
  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {};

  return (
    <>
      <B4hForm onClick={handleOnSubmit}>
        <label htmlFor="name">name</label>
        <B4hInput type="text" id="name" name="name" defaultValue={label?.name} />
        <label htmlFor="icon">icon</label>
        <B4hInput type="text" id="icon" name="icon" defaultValue={label?.icon} />
        <B4hButton type="submit">{label ? 'update' : 'add'}</B4hButton>
        <Link to={B4hRoutes.labels}>
          <B4hButton buttonType="secondary" widthFit>
            cancel
          </B4hButton>
        </Link>
      </B4hForm>
    </>
  );
};
