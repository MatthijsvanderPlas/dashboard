import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { BarGroupProps, IScore } from '~/utils/types';
import { useEffect, useMemo, useRef, useState } from 'react';
import Bar from './Bar';
import { Brush } from '@visx/brush';
import { Bounds } from '@visx/brush/lib/types';
import BaseBrush from '@visx/brush/lib/BaseBrush';
import { PatternLines } from '@visx/pattern';
import { LegendItem, LegendLabel, LegendOrdinal } from '@visx/legend';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { toggleAssignment } from '~/store/filterSlice';
import { selectAssignmentFilter } from '~/store/selectors';
import _ from 'underscore';

const background = '#ffffff';
const bar1 = '#8dddd0';
const bar2 = '#f6c85f';

const x = window.innerWidth > 1000 ? 10 : 5;

export default function Chart({
  width,
  height,
  data,
  margin = { top: 40, right: 0, bottom: 70, left: 30 },
}: BarGroupProps) {
  const brushRef = useRef<BaseBrush | null>(null);
  const [filterData, setFilterData] = useState<IScore[]>([]);
  const [dataSlice, setDataSlice] = useState<number[]>([0, x]);
  const [colors, setColors] = useState<string[]>([bar1, bar2]);
  const [keys, setKeys] = useState<string[]>(
    Object.keys(data[0]).filter((d) => d !== 'assignment'),
  );
  const filterKeys = useAppSelector(selectAssignmentFilter, _.isEqual);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setKeys(filterKeys);
  }, [filterKeys]);

  useEffect(() => {
    if (keys.includes('difficulty')) {
      setColors([bar1, bar2]);
    } else {
      setColors([bar2]);
    }
  }, [keys]);

  useEffect(() => {
    setFilterData(data.slice(dataSlice[0], dataSlice[1]));
  }, [data, dataSlice]);

  const PATTERN_ID = 'brush_pattern';
  const selectedBrushStyle = {
    fill: `url(#${PATTERN_ID})`,
    stroke: '#4e8ac8',
  };

  const getAssignment = (d: IScore) => d.assignment;

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

  const ordinalScale = scaleOrdinal({
    domain: Object.keys(data[0]).filter((d) => d !== 'assignment'),
    range: [bar1, bar2],
  });

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
    range: colors,
  });

  const initialPosition = useMemo(
    () => ({
      start: { x: brushAssignmentScale(getAssignment(data[0])) },
      end: { x: brushAssignmentScale(getAssignment(data[x])) },
    }),
    [brushAssignmentScale, data],
  );

  const onBrushChange = (domain: Bounds | null) => {
    if (!domain) return;
    const { xValues } = domain;
    if (xValues) {
      const first = data.findIndex((obj) => obj.assignment === xValues[0]);
      const last = data.findIndex((obj) => obj.assignment === xValues[xValues.length - 1]);
      setDataSlice([first, last]);
    }
  };

  const handleClick = (key: string) => {
    dispatch(toggleAssignment(key));
  };

  assignmentScale.rangeRound([0, xMax]);
  groupScale.rangeRound([0, assignmentScale.bandwidth()]);
  brushGroupScale.rangeRound([0, brushAssignmentScale.bandwidth()]);
  scoreScale.range([yMax, 0]);
  brushScoreScale.range([yBrushMax, 0]);
  brushAssignmentScale.rangeRound([0, xBrushMax]);

  return width < 10 ? null : (
    <>
      <div className='relative flex top-0 justify-center'>
        <LegendOrdinal
          scale={ordinalScale}
          direction='row'
          labelMargin='0 20px 0 5px'
          shape={'circle'}
          shapeMargin='1px 0 0'
        >
          {(labels: any[]) => (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              {labels.map((label, i) => (
                <LegendItem
                  className={`cursor-pointer ${
                    !keys.includes(label.text) ? 'opacity-30 line-through' : null
                  }`}
                  key={`legend-quantile-${i}`}
                  margin='0 5px'
                  onClick={() => handleClick(label.text)}
                >
                  <svg width={15} height={15}>
                    <circle
                      viewBox='0 0 30 30'
                      fill={label.value}
                      r={15 / 2}
                      cx={15 / 2}
                      cy={15 / 2}
                    />
                  </svg>
                  <LegendLabel align='left' margin='0 0 0 4px'>
                    {label.text}
                  </LegendLabel>
                </LegendItem>
              ))}
            </div>
          )}
        </LegendOrdinal>
      </div>
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
          hideGridRows
          showBox
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
    </>
  );
}
