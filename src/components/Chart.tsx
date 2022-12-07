import { Group } from '@visx/group';
import { BarGroup } from '@visx/shape';
import { AxisBottom } from '@visx/axis';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { BarGroupProps, IScore } from '~/utils/types';

export default function Chart({
  width,
  height,
  data,
  events = false,
  margin = { top: 40, right: 0, bottom: 40, left: 0 },
}: BarGroupProps) {
  const keys = Object.keys(data[0]).filter((d) => d !== 'assignment');
  const getAssignment = (d: IScore) => d.assignment;
  const background = '#ffffff';
  const blue = '#0000FF';
  const green = '#00FF00';
  const assignmentScale = scaleBand<string>({
    domain: Object.values(data).map(getAssignment).slice(0, 10),
    padding: 0.01,
  });

  const groupScale = scaleBand<string>({
    domain: keys,
    padding: 0.1,
  });

  const scoreScale = scaleLinear<number>({
    domain: [0, 5],
  });

  const colorScale = scaleOrdinal<string, string>({
    domain: keys,
    range: [blue, green],
  });

  //bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  assignmentScale.rangeRound([0, xMax]);
  groupScale.rangeRound([0, assignmentScale.bandwidth()]);
  scoreScale.range([yMax, 0]);

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} fill={background} rx={14} />
      <Group top={margin.top} left={margin.left}>
        <BarGroup
          data={data}
          keys={keys}
          height={yMax}
          x0={getAssignment}
          x0Scale={assignmentScale}
          x1Scale={groupScale}
          yScale={scoreScale}
          color={colorScale}
        >
          {(barGroups) =>
            barGroups.map((barGroup) => (
              <Group key={`bar-group-${barGroup.index}-${barGroup.x0}`} left={barGroup.x0}>
                {barGroup.bars.map((bar) => (
                  <rect
                    key={`bar-group-bar-${barGroup.index}-${bar.index}-${bar.value}-${bar.key}`}
                    x={bar.x}
                    y={bar.y}
                    width={bar.width}
                    height={bar.height}
                    fill={bar.color}
                    rx={4}
                    onClick={() => {
                      if (!events) return;
                      const { key, value } = bar;
                      alert(JSON.stringify({ key, value }));
                    }}
                  />
                ))}
              </Group>
            ))
          }
        </BarGroup>
      </Group>
      <AxisBottom
        top={yMax + margin.top}
        scale={assignmentScale}
        stroke={green}
        tickStroke={green}
        hideAxisLine
        tickLabelProps={() => ({
          fill: green,
          fontSize: 11,
          textAnchor: 'middle',
        })}
      />
    </svg>
  );
}
