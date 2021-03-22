import { FC, memo, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ExpenseModel, ExpenseType } from '../../models/expenseModel';

export type ExpenseSummaryProps = {
  items: ExpenseModel[];
};

export const ExpenseSummaryPage: FC<ExpenseSummaryProps> = memo((props: ExpenseSummaryProps) => {
  const [t] = useTranslation();

  const [totalIncoming, setTotalIncoming] = useState<number>(0);
  const [totalOutcoming, setTotalOutcoming] = useState<number>(0);
  const [totalLeft, setTotalLeft] = useState<number>(0);
  const [totalLeftPer, setTotalLeftPer] = useState<number>(0);

  useEffect(() => {
    let tmpTotalIncoming: number = 0;
    let tmpTotalOutcoming: number = 0;

    props.items.forEach(e => {
      if (e.type === ExpenseType.Incoming) {
        tmpTotalIncoming += e.value;
      } else {
        tmpTotalOutcoming += e.value;
      }
    });

    setTotalIncoming(tmpTotalIncoming);
    setTotalOutcoming(tmpTotalOutcoming);

    const tmpTotalLeft = tmpTotalIncoming - tmpTotalOutcoming;

    setTotalLeft(tmpTotalLeft);
    if (tmpTotalIncoming === 0) {
      setTotalLeftPer(0);
    } else {
      const left = (tmpTotalLeft / tmpTotalIncoming) * 100;
      setTotalLeftPer(left);
    }
  }, [props.items]);

  const totalLeftColor = useMemo(() => (totalLeft > 0 ? 'text-success' : 'text-danger'), [totalLeft]);

  return (
    <>
      <div className="mt-2 row">
        <div className="col">
          <p>{t('TOTAL_INCOMING')}</p>
        </div>
        <div className="col">{totalIncoming.toFixed(2)}</div>
      </div>
      <div className="row">
        <div className="col">
          <p>{t('TOTAL_OUTCOMING')}</p>
        </div>
        <div className="col">{totalOutcoming.toFixed(2)}</div>
      </div>
      <div className="row">
        <div className="col">
          <p>{t('TOTAL_LEFT')}</p>
        </div>
        <div className={`col ${totalLeftColor}`}>{`${totalLeft.toFixed(2)} ${totalLeftPer.toFixed(2)}%`}</div>
      </div>
    </>
  );
});
