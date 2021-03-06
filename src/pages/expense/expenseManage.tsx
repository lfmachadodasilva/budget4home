import { ChangeEvent, FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { format, parse } from 'date-fns';
import { first, trim } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';

import { ItemFooterComponent } from '../../components/itemFooter/itemFooter';
import { ItemHeaderComponent } from '../../components/itemHeader/itemHeader';
import { redirectTo } from '../../helpers/redirectHelper';
import { ExpenseManageModel, ExpenseType } from '../../models/expenseModel';
import { addExpense, editExpense, getExpense } from '../../services/expenseService';
import { getAllLabels } from '../../services/labelService';
import { Routes } from '../routes';
import { AlertComponent } from '../../components/alert/alert';

interface ManageProps {
  id: string;
  groupId: string;
}

export const ExpenseManage: FC = memo(() => {
  const [t] = useTranslation();

  const history = useHistory();
  const { id, groupId } = useParams<ManageProps>();
  const [isEditMode, setEditMode] = useState(false);
  const [name, setName] = useState<string>();
  const [type, setType] = useState(ExpenseType.Outcoming);
  const [value, setValue] = useState<number>();
  const [date, setDate] = useState(new Date(Date.now()));
  const [schedule, setSchedule] = useState(1);
  const [labelId, setLabelId] = useState<number>();
  const [labels, setLabels] = useState<JSX.Element[]>([]);
  const [comments, setComments] = useState<string>();
  const [error, setError] = useState<string>();

  const handleOnChangeName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }, []);
  const handleOnChangeValue = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(+event.target.value);
  }, []);
  const handleOnChangeType = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setType(+event.target.value);
  }, []);
  const handleOnChangeDate = useCallback(
    (event: ChangeEvent<HTMLDataElement>) => {
      setDate(parse(event.target.value, t('INPUT_DATE_FORMAT'), new Date()));
    },
    [t]
  );
  const handleOnChangeSchedule = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setSchedule(+event.target.value);
  }, []);
  const handleOnChangeLabel = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setLabelId(+event.target.value);
  }, []);
  const handleOnChangeComments = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setComments(event.target.value);
  }, []);

  const handleOnAction = useCallback(() => {
    const runAsync = async () => {
      const expense = {
        id: +id ?? 0,
        type: type,
        name: trim(name) ?? '',
        value: value,
        date: date,
        schedule: schedule,
        labelId: labelId ?? 0,
        comments: comments
      } as ExpenseManageModel;

      if (isEditMode) {
        editExpense(+groupId, expense)
          .then(() => {
            redirectTo(history, Routes.expense);
          })
          .catch(() => setError(t('ERROR_EDIT')));
      } else {
        addExpense(+groupId, expense)
          .then(() => {
            // save this label to be used next time
            labelId && localStorage.setItem('lastLabel', labelId.toString());
            redirectTo(history, Routes.expense);
          })
          .catch(() => setError(t('ERROR_ADD')));
      }
    };
    runAsync();
  }, [isEditMode, name, history, id, groupId, date, labelId, schedule, type, value, comments, t]);

  const handleOnCancel = useCallback(() => {
    redirectTo(history, Routes.expense);
  }, [history]);

  useEffect(() => {
    if (isNaN(+id)) {
      // show error
      return;
    }

    setEditMode(+id !== 0);

    if (+id !== 0) {
      // get group to edit
      const runAsync = async () => {
        try {
          var expense = await getExpense(+id);

          setName(expense.name);
          setType(expense.type);
          setValue(expense.value);
          setDate(expense.date);
          setSchedule(expense.scheduleTotal);
          setLabelId(expense.labelId);
          setComments(expense.comments);
        } catch {}
      };
      runAsync();
    }
  }, [id, groupId]);

  useEffect(() => {
    if (isNaN(+groupId)) {
      return;
    }

    getAllLabels(+groupId)
      .then(value => {
        setLabels(
          value.map(x => (
            <option key={x.id} value={x.id}>
              {x.name}
            </option>
          ))
        );
        if (!isEditMode) {
          // check localstorage for the last label usedd
          const lastLabel = localStorage.getItem('lastLabel');
          if (lastLabel && value.find(x => x.id === +lastLabel)) {
            // this label is valid
            setLabelId(+lastLabel);
          } else {
            // select the first one available
            const firstLabel = first(value)?.id;
            setLabelId(firstLabel);
            firstLabel && localStorage.setItem('lastLabel', firstLabel.toString());
          }
        }
      })
      .catch(() => setError(t('ERROR_DELETE')));
  }, [isEditMode, groupId, t]);

  const isActionDisabled = useMemo(() => {
    return !name || name.length === 0 || !value || value < 0 || labels.length === 0 || !labelId;
  }, [name, value, labels, labelId]);

  return (
    <>
      <ItemHeaderComponent title={t('EXPENSE')} />
      <AlertComponent show={error !== undefined} body={error ?? ''} />
      <form>
        <div className="mb-2">
          <label htmlFor="expense-type" className="form-label">
            {t('Type')}
          </label>
          <select className="form-select" onChange={handleOnChangeType} value={type}>
            <option key={ExpenseType.Outcoming.toString()} value={ExpenseType.Outcoming}>
              {t('OUTCOMING')}
            </option>
            <option key={ExpenseType.Incoming.toString()} value={ExpenseType.Incoming}>
              {t('INCOMING')}
            </option>
          </select>
        </div>
        <div className="mb-2">
          <label htmlFor="expense-name" className="form-label">
            {t('NAME')}
          </label>
          <input
            id="expense-name"
            type="text"
            className="form-control"
            onChange={handleOnChangeName}
            value={name ?? ''}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="expense-value" className="form-label">
            {t('VALUE')}
          </label>
          <input
            type="number"
            className="form-control"
            id="expense-value"
            onChange={handleOnChangeValue}
            value={value ?? 0}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="expense-date" className="form-label">
            {t('DATE')}
          </label>
          <input
            type="date"
            className="form-control"
            id="expense-date"
            onChange={handleOnChangeDate}
            value={format(new Date(date), t('INPUT_DATE_FORMAT'))}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="expense-schedule" className="form-label">
            {t('Schedule')}
          </label>
          <select className="form-select" onChange={handleOnChangeSchedule} value={type} disabled={isEditMode}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(x => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label htmlFor="expense-label" className="form-label">
            {t('Label')}
          </label>
          <select className="form-select" onChange={handleOnChangeLabel} value={labelId}>
            {labels}
          </select>
        </div>
        <div className="mb-2">
          <label htmlFor="expense-comments" className="form-label">
            {t('COMMENTS')}
          </label>
          <textarea
            id="expense-comments"
            className="form-control"
            rows={3}
            onChange={handleOnChangeComments}
            value={comments ?? ''}
          />
        </div>
      </form>
      <ItemFooterComponent
        primaryText={isEditMode ? t('EDIT') : t('ADD')}
        onPrimary={handleOnAction}
        disablePrimary={isActionDisabled}
        secondaryText={t('CANCEL')}
        onSecondary={handleOnCancel}
      />
    </>
  );
});
