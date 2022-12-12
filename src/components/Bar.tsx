import { Group } from '@visx/group';
import { BarGroup } from '@visx/shape';
import { AxisBottom, AxisLeft, AxisScale } from '@visx/axis';
import { IScore } from '~/utils/types';
import { AnyScaleBand } from '@visx/shape/lib/types';

export interface IBarProps {
  xMax: number;
  height: number;
  margin: { top: number; right: number; left: number; bottom: number };
  data: IScore[];
  keys: string[];
  yMax: number;
  xScale: AnyScaleBand;
  xGroupScale: AnyScaleBand;
  yScale: AxisScale<number>;
  colorScale: any;
  events?: boolean;
  hideAxisLeft?: boolean;
  hideAxisBottom?: boolean;
  left?: number;
  top?: number;
  children?: React.ReactNode;
}

export default function Bar({
  xMax,
  height,
  margin,
  data,
  keys,
  yMax,
  xScale,
  xGroupScale,
  yScale,
  colorScale,
  top,
  left,
  events = false,
  hideAxisLeft = false,
  hideAxisBottom = false,
  children,
}: IBarProps) {
  const getAssignment = (d: IScore) => d.assignment;

  const black = '#4e8ac8';

  return xMax < 10 ? null : (
    <>
      <Group top={top || margin.top} left={left || margin.left}>
        <BarGroup
          data={data}
          keys={keys}
          width={xMax}
          height={height}
          x0={getAssignment}
          x0Scale={xScale}
          x1Scale={xGroupScale}
          yScale={yScale}
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
        {!hideAxisBottom && (
          <AxisBottom
            top={yMax}
            scale={xScale}
            stroke={black}
            tickStroke={black}
            tickLabelProps={() => ({
              fill: black,
              fontSize: 11,
              width: 20,
              textAnchor: 'middle',
            })}
          />
        )}
        {!hideAxisLeft && (
          <AxisLeft
            scale={yScale}
            stroke={black}
            strokeWidth={1.6}
            tickStroke={black}
            tickLabelProps={() => ({
              fill: black,
              fontSize: 15,
              textAnchor: 'end',
            })}
            tickValues={[1, 2, 3, 4, 5]}
          />
        )}
        {children}
      </Group>
    </>
  );
}
