import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { BarGroupProps, IScore } from '~/utils/types';
import { useEffect, useMemo, useRef, useState } from 'react';
import Bar from './Bar';
import { Brush } from '@visx/brush';
import { Bounds } from '@visx/brush/lib/types';
import BaseBrush from '@visx/brush/lib/BaseBrush';
import { PatternLines } from '@visx/pattern';

export default function Chart({
  width,
  height,
  data,
  margin = { top: 40, right: 0, bottom: 70, left: 30 },
}: BarGroupProps) {
  const brushRef = useRef<BaseBrush | null>(null);
  const [filterData, setFilterData] = useState<IScore[]>([]);

  useEffect(() => {
    setFilterData(data.slice(0, 10));
  }, [data]);

  const PATTERN_ID = 'brush_pattern';
  const selectedBrushStyle = {
    fill: `url(#${PATTERN_ID})`,
    stroke: '#4e8ac8',
  };

  const keys = Object.keys(data[0]).filter((d) => d !== 'assignment');
  const getAssignment = (d: IScore) => d.assignment;
  const background = '#ffffff';
  const bar1 = '#8dddd0';
  const bar2 = '#f6c85f';

  const brushMargin = { top: 10, bottom: 15, left: 30, right: 20 };

  const innerHeight = height - margin.top - margin.bottom;
  const topChartBottomMargin = 40;
  const topChartHeight = 0.8 * innerHeight - topChartBottomMargin;
  const bottomChartHeight = innerHeight - topChartHeight - topChartBottomMargin;

  //bounds
  const xMax = Math.max(width - margin.left - margin.right, 0);
  const yMax = Math.max(topChartHeight, 0);
  const xBrushMax = Math.max(width - margin.left - margin.right, 0);
  const yBrushMax = Math.max(bottomChartHeight);

  const assignmentScale = scaleBand<string>({
    domain: Object.values(filterData).map(getAssignment),
    range: [0, xMax],
    paddingOuter: 0.25,
    paddingInner: 0.1,
  });

  const brushAssignmentScale = scaleBand<string>({
    domain: Object.values(data).map(getAssignment),
    range: [0, xBrushMax],
    paddingOuter: 0,
    paddingInner: 0,
  });

  const groupScale = scaleBand<string>({
    domain: keys,
    padding: 0.1,
  });

  const brushGroupScale = scaleBand<string>({
    domain: keys,
    padding: 0.1,
  });

  const scoreScale = scaleLinear<number>({
    domain: [0, 5],
    nice: true,
  });

  const brushScoreScale = scaleLinear<number>({
    domain: [0, 5],
    nice: true,
  });

  const colorScale = scaleOrdinal<string, string>({
    domain: keys,
    range: [bar1, bar2],
  });

  const initialPosition = useMemo(
    () => ({
      start: { x: brushAssignmentScale(getAssignment(data[0])) },
      end: { x: brushAssignmentScale(getAssignment(data[9])) },
    }),
    [brushAssignmentScale, data],
  );

  const onBrushChange = (domain: Bounds | null) => {
    if (!domain) return;
    const { xValues } = domain;
    if (xValues) {
      const first = data.findIndex((obj) => obj.assignment === xValues[0]);
      const last = data.findIndex((obj) => obj.assignment === xValues[xValues.length - 1]);
      const dataCopy = data.slice(first, last);
      setFilterData(dataCopy);
    }
  };

  assignmentScale.rangeRound([0, xMax]);
  groupScale.rangeRound([0, assignmentScale.bandwidth()]);
  brushGroupScale.rangeRound([0, brushAssignmentScale.bandwidth()]);
  scoreScale.range([yMax, 0]);
  brushScoreScale.range([yBrushMax, 0]);
  brushAssignmentScale.rangeRound([0, xBrushMax]);

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={xMax} height={height} fill={background} rx={35} />
      <Bar
        xMax={xMax}
        height={topChartHeight}
        margin={margin}
        data={filterData}
        keys={keys}
        yMax={yMax}
        xScale={assignmentScale}
        xGroupScale={groupScale}
        yScale={scoreScale}
        colorScale={colorScale}
      />
      <Bar
        xMax={xBrushMax}
        height={bottomChartHeight}
        margin={margin}
        top={topChartHeight + topChartBottomMargin + margin.bottom}
        data={data}
        keys={keys}
        yMax={yBrushMax}
        xScale={brushAssignmentScale}
        xGroupScale={brushGroupScale}
        yScale={brushScoreScale}
        colorScale={colorScale}
        hideAxisBottom
        hideAxisLeft
      >
        <PatternLines
          id={PATTERN_ID}
          height={8}
          width={8}
          stroke={'#4e8ac8'}
          strokeWidth={0.2}
          orientation={['diagonal']}
        />
        <Brush
          xScale={brushAssignmentScale}
          yScale={brushScoreScale}
          width={xBrushMax}
          height={yBrushMax}
          innerRef={brushRef}
          margin={brushMargin}
          resizeTriggerAreas={[]}
          brushDirection='horizontal'
          initialBrushPosition={initialPosition}
          onChange={onBrushChange}
          selectedBoxStyle={selectedBrushStyle}
          useWindowMoveEvents
        />
      </Bar>
    </svg>
  );
}
