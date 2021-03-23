import React, { FC, memo, useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import { LoadingComponent } from '../../components/loading/loading';
import { LabelFullModel } from '../../models/labelModel';
import 'chartjs-plugin-colorschemes';
import './labelGraphPage.scss';

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
  const [graphType] = React.useState(LabelGraphType.CurrentMonth);

  const graphElement = useMemo(() => {
    return (
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
    );
  }, [labels, graphType]);

  return (
    <>
      <LoadingComponent isLoading={props.isLoading}>
        <div className="d-flex justify-content-center">
          {/* ignore chart.js on testing */}
          {process.env.NODE_ENV !== 'test' && graphElement}
        </div>
      </LoadingComponent>
    </>
  );
});
