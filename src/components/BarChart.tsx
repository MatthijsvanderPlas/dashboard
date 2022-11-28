import { AxisBottom, AxisLeft, AxisScale } from '@visx/axis';
import { Group } from '@visx/group';
import { scaleOrdinal } from '@visx/scale';
import { BarGroup } from '@visx/shape';
import { AnyScaleBand } from '@visx/shape/lib/types';
import { Text } from '@visx/text';
import { DataProps, Keys } from '~/utils/types';

const BarChart = ({
  data,
  yMax,
  margin,
  gradeScale,
  keyScale,
  assignmentScale,
  keys,
  xMax,
  events = false,
  left,
  top,
  children,
  hideLeftAxis = false,
  hideBottomAxis = false,
}: {
  data: DataProps[];
  keys: Keys[];
  yMax: number;
  xMax: number;
  assignmentScale: AnyScaleBand;
  keyScale: AnyScaleBand;
  gradeScale: AxisScale<number>;
  margin: { top: number; right: number; left: number; bottom: number };
  events?: boolean;
  top?: number;
  left?: number;
  children?: React.ReactNode;
  hideLeftAxis?: boolean;
  hideBottomAxis?: boolean;
}) => {
  // colors
  const blue = '#0000FF';
  const red = '#FF0000';
  const colorScale = scaleOrdinal<string, string>({
    domain: keys,
    range: [blue, red],
  });
  return (
    <Group left={left || margin.left} top={top || margin.top}>
      <BarGroup
        top={margin.top}
        left={margin.left}
        data={data}
        keys={keys}
        height={yMax}
        width={xMax}
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
                  x={bar.x + margin.left}
                  y={bar.y + margin.top}
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
      {!hideLeftAxis ? (
        <AxisLeft
          label='Grade ->'
          labelOffset={30}
          labelProps={{
            x: -(margin.top * 4),
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
      ) : null}
      {!hideBottomAxis ? (
        <AxisBottom
          label='Assignment ->'
          labelProps={{
            fontSize: 12,
            x: margin.left,
            y: margin.bottom * 2.2,
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
      ) : null}
      {children}
    </Group>
  );
};

export default BarChart;
