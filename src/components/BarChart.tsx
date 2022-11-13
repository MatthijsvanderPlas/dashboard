import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { Group } from '@visx/group';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { BarGroup } from '@visx/shape';
import { Text } from '@visx/text';

type keys = 'difficulty' | 'fun';

type DataProps = {
  assignment: string;
  difficulty: number;
  fun: number;
};

type BarGroupProps = {
  data: DataProps[];
  width: number;
  height: number;
  events?: boolean;
  margin?: { top: number; right: number; bottom: number; left: number };
};

// margins
const defaultMargin = { top: 64, right: 64, bottom: 64, left: 64 };

// colors
const blue = '#0000FF';
const red = '#FF0000';

const Example = ({
  data,
  width,
  height,
  events = false,
  margin = defaultMargin,
}: BarGroupProps) => {
  // keys
  const keys = Object.keys(data[0]).filter((d) => d !== 'assignment') as keys[];

  // scales
  const assignmentScale = scaleBand<string>({
    domain: data.map((d) => d.assignment as string),
    padding: 0.01,
  });

  const keyScale = scaleBand<string>({
    domain: keys,
    padding: 0.2,
  });

  const gradeScale = scaleLinear<number>({
    domain: [0, Math.max(...data.map((d) => d.difficulty))],
  });

  const colorScale = scaleOrdinal<string, string>({
    domain: keys,
    range: [blue, red],
  });

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  //update scale output dimensions
  assignmentScale.rangeRound([0, xMax]);
  keyScale.rangeRound([0, assignmentScale.bandwidth()]);
  gradeScale.range([yMax, 0]);

  return (
    <svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} rx={14} fill='white' />
      <Group top={margin.top} left={margin.left}>
        <BarGroup
          data={data}
          keys={keys}
          height={yMax}
          x0={(d) => d.assignment as string}
          x0Scale={assignmentScale}
          x1Scale={keyScale}
          yScale={gradeScale}
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
                    fillOpacity={0.35}
                    stroke={bar.color}
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
      <AxisLeft
        label='Grade'
        labelOffset={36}
        labelProps={{
          x: -margin.top,
          fontSize: 14,
        }}
        left={margin.left}
        top={margin.top}
        scale={gradeScale}
        hideZero
        // tickValues={() => {}}
        tickLength={5}
        tickLabelProps={() => ({
          textAnchor: 'end',
          fontSize: 14,
          dx: -7,
        })}
      />
      <AxisBottom
        label='Assignment ->'
        labelProps={{
          fontSize: 12,
          x: width / 2,
        }}
        top={yMax + margin.top}
        left={margin.left}
        scale={assignmentScale}
        tickComponent={(d) => {
          if (d.formattedValue) {
            return d.formattedValue.length > 10 ? (
              d.formattedValue === 'W4D3 - Project - Next-Level CSS' ? (
                <Text x={d.x} y={d.y} textAnchor='middle' dy='35' width={20} fontSize='10'>
                  {d.formattedValue?.replaceAll(' - ', ' ')}
                </Text>
              ) : (
                <Text x={d.x} y={d.y} textAnchor='middle' dy='25' width={20} fontSize='10'>
                  {d.formattedValue?.replaceAll(' - ', ' ')}
                </Text>
              )
            ) : (
              <Text x={d.x} y={d.y} textAnchor='middle' dy='5' width={20} fontSize='10'>
                {d.formattedValue}
              </Text>
            );
          } else return null;
        }}
        numTicks={data.length}
      />
    </svg>
  );
};

export default Example;
