import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { LegendItem, LegendLabel, LegendOrdinal } from '@visx/legend';
import BarChart from './BarChart';
import { PatternLines } from '@visx/pattern';
import { Brush } from '@visx/brush';
import { useMemo, useRef } from 'react';
import BaseBrush from '@visx/brush/lib/BaseBrush';
import { BarGroupProps, DataProps, Keys } from '~/utils/types';

// accessors
const getAssignment = (d: DataProps) => d.assignment;

// margins
const brushMargin = { top: 10, right: 20, bottom: 15, left: 50 };

// colors
const blue = '#0000FF';
const red = '#FF0000';

const Example = ({
  data,
  width,
  height,
  events = false,
  margin = { top: 20, left: 50, bottom: 20, right: 20 },
}: BarGroupProps) => {
  // creating a filtered state to show slices with the brush
  // const [filteredData, setFilteredData] = useState(data);

  // keys
  const keys = Object.keys(data[0]).filter((d) => d !== 'assignment') as Keys[];

  const innerHeight = height - margin.top - margin.bottom;
  const topChartBottomMargin = 60;
  const topChartHeight = 0.8 * innerHeight - topChartBottomMargin;
  const bottomChartHeight = innerHeight - topChartHeight - 30;

  const xMax = Math.max(width - margin.left - margin.right, 0);
  const yMax = Math.max(topChartHeight, 0);
  const xBrushMax = Math.max(width - brushMargin.left - brushMargin.right, 0);
  const yBrushMax = Math.max(bottomChartHeight - brushMargin.top - brushMargin.bottom, 0);

  // scales
  const assignmentScale = scaleBand<string>({
    domain: data.map((d) => d.assignment),
    range: [0, xMax],
    padding: 0.001,
  });

  const assignmentBrushScale = useMemo(
    () =>
      scaleBand<string>({
        domain: data.map(getAssignment),
        range: [0, 450],
        padding: 0.01,
      }),
    [data],
  );

  const keyScale = scaleBand<string>({
    domain: keys,
    padding: 0.1,
  });

  const gradeScale = scaleLinear<number>({
    domain: [0, Math.max(...data.map((d) => d.difficulty), ...data.map((d) => d.fun))],
  });

  const colorScale = scaleOrdinal<string, string>({
    domain: keys,
    range: [blue, red],
  });

  //update scale output dimensions
  assignmentScale.rangeRound([0, xMax]);
  keyScale.rangeRound([0, assignmentScale.bandwidth()]);
  gradeScale.range([yMax, 0]);

  const brushRef = useRef<BaseBrush | null>(null);

  const initialBrushPosition = useMemo(
    () => ({
      start: { x: assignmentScale(data[0].assignment) },
      end: { x: assignmentScale(data[9].assignment) },
    }),
    [assignmentScale, data],
  );

  const PATTERN_ID = 'brush_pattern';
  const selectedBrushStyle = {
    fill: `url(#${PATTERN_ID})`,
    stroke: 'black',
  };
  console.log(assignmentScale.domain());
  return (
    <>
      <LegendOrdinal scale={colorScale} labelFormat={(label) => `${label.toUpperCase()}`}>
        {(labels) => (
          <div style={{ display: 'flex', flexDirection: 'row', fontSize: '11px' }}>
            {labels.map((label, i) => (
              <LegendItem
                key={`legend-quantile-${i}`}
                margin='0 5px'
                onClick={() => {
                  if (events) alert(`clicked: ${JSON.stringify(label)}`);
                }}
              >
                <svg width={15} height={15}>
                  <rect fill={label.value} fillOpacity={0.35} width={15} height={15} />
                </svg>
                <LegendLabel align='left' margin='0 0 0 4px'>
                  {label.text}
                </LegendLabel>
              </LegendItem>
            ))}
          </div>
        )}
      </LegendOrdinal>
      <svg width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} rx={14} fill='white' />
        <BarChart
          margin={margin}
          data={data}
          keys={keys}
          yMax={yMax}
          xMax={xMax}
          assignmentScale={assignmentScale}
          keyScale={keyScale}
          gradeScale={gradeScale}
        />
        <BarChart
          hideBottomAxis
          hideLeftAxis
          data={data}
          xMax={xBrushMax}
          yMax={yBrushMax}
          keys={keys}
          assignmentScale={assignmentScale}
          keyScale={keyScale}
          gradeScale={gradeScale}
          margin={brushMargin}
          top={topChartHeight + topChartBottomMargin + margin.top}
        >
          <PatternLines
            id={PATTERN_ID}
            height={8}
            width={8}
            stroke={'#000000'}
            strokeWidth={1}
            orientation={['diagonal']}
          />
          <Brush
            xScale={assignmentBrushScale}
            yScale={gradeScale}
            width={xBrushMax}
            height={yBrushMax}
            margin={brushMargin}
            innerRef={brushRef}
            initialBrushPosition={initialBrushPosition}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onChange={() => {}}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onClick={() => {}}
            selectedBoxStyle={selectedBrushStyle}
            useWindowMoveEvents
          />
        </BarChart>
      </svg>
    </>
  );
};

export default Example;
