import React, { FC, memo, useCallback, useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';

import 'chartjs-plugin-colorschemes';
import './labelGraphPage.scss';

import { LoadingComponent } from '../../components/loading/loading';
import { LabelFullModel } from '../../models/labelModel';
import { TabsComponent, TabTitleSize } from '../../components/tabs/tabs';

export type LabelGraphProps = {
  items: LabelFullModel[];
  isLoading: boolean;
};

enum LabelGraphType {
  CurrentMonth = 1,
  LastMonth,
  Average
}

export const LabelGraphPage: FC<LabelGraphProps> = memo((props: LabelGraphProps) => {
  const { items: labels } = props;
  const [t] = useTranslation();

  const getGraphElement = useCallback(
    (graphType: LabelGraphType) => {
      return (
        <div className="d-flex justify-content-center">
          <Pie
            key={graphType}
            data={
              labels.length > 0
                ? {
                    labels: labels.map(label => label.name),
                    datasets: [
                      {
                        data: labels.map(label =>
                          graphType === LabelGraphType.CurrentMonth
                            ? label.currValue
                            : graphType === LabelGraphType.LastMonth
                            ? label.lastValue
                            : label.avgValue
                        ),
                        borderWidth: 0
                      }
                    ]
                  }
                : {
                    labels: ['Empty'],
                    datasets: [
                      {
                        data: [1],
                        borderWidth: 0
                      }
                    ]
                  }
            }
            options={{
              plugins: {
                colorschemes: {
                  scheme: 'office.Excel16'
                }
              }
            }}
            width={100}
            height={100}
          />
        </div>
      );
    },
    [labels]
  );

  const [currElement, lastElement, avgElement] = useMemo(() => {
    return [
      getGraphElement(LabelGraphType.CurrentMonth),
      getGraphElement(LabelGraphType.LastMonth),
      getGraphElement(LabelGraphType.Average)
    ];
  }, [getGraphElement]);

  return (
    <>
      <LoadingComponent isLoading={props.isLoading}>
        {process.env.NODE_ENV !== 'test' && (
          <TabsComponent
            titleSize={TabTitleSize.Small}
            // titlePosition={TabTitlePosition.Botton}
            items={[
              {
                key: 'curr',
                title: t('CURRENT_MONTH'),
                body: currElement
              },
              {
                key: 'last',
                title: t('LAST_MONTH'),
                body: lastElement
              },
              {
                key: 'avg',
                title: t('AVERAGE_VALUE'),
                body: avgElement
              }
            ]}
          />
        )}
      </LoadingComponent>
    </>
  );
});
