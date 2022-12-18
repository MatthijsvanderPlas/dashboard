import { Group } from '@visx/group';
import { BarGroup } from '@visx/shape';
import { AxisBottom, AxisLeft, AxisScale } from '@visx/axis';
import { IScore } from '~/utils/types';
import { AnyScaleBand, BarGroupBar } from '@visx/shape/lib/types';
import { GridRows } from '@visx/grid';
import { useTooltip, defaultStyles, useTooltipInPortal } from '@visx/tooltip';

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
  hideGridRows?: boolean;
  tooltipForBrush?: boolean;
}

type TooltipData = {
  ass: string;
  key: string;
  value: number;
};

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
  hideGridRows = false,
  children,
}: IBarProps) {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } =
    useTooltip<TooltipData>();

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    scroll: true,
    detectBounds: true,
  });

  const tooltipStyles = {
    ...defaultStyles,
    minWidth: 60,
    backgroundColor: 'rgba(0,0,0,0.9)',
    color: 'white',
    zIndex: 100,
  };

  const getAssignment = (d: IScore) => d.assignment;

  const handleMouseOverBar = (
    e: React.MouseEvent<SVGRectElement, MouseEvent>,
    idx: number,
    bar: BarGroupBar<string>,
  ) => {
    const x = e.clientX;
    const y = e.clientY;
    showTooltip({
      tooltipLeft: x,
      tooltipTop: y,
      tooltipData: { ass: data[idx].assignment, key: bar.key, value: bar.value },
    });
  };

  const black = '#4e8ac8';

  return xMax < 10 ? null : (
    <>
      <Group ref={containerRef} top={top || margin.top} left={left || margin.left}>
        {!hideGridRows && (
          <GridRows
            scale={yScale}
            width={xMax}
            height={height}
            stroke='#e0e0e0'
            tickValues={[1, 2, 3, 4, 5]}
          />
        )}
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
                    onMouseMove={(e) => handleMouseOverBar(e, barGroup.index, bar)}
                    onMouseOut={hideTooltip}
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
        {tooltipOpen && tooltipData && (
          <TooltipInPortal
            key={Math.random()}
            top={tooltipTop}
            left={tooltipLeft}
            style={tooltipStyles}
          >
            <div>
              <strong>{tooltipData.ass}</strong>
            </div>
            <div>{tooltipData.key}</div>
            <div>
              <small>{tooltipData.value}</small>
            </div>
          </TooltipInPortal>
        )}
        {!hideAxisBottom && (
          <AxisBottom
            top={yMax}
            scale={xScale}
            stroke={black}
            tickStroke={black}
            tickFormat={(tick) => {
              if (tick.length > 10) {
                return tick.replaceAll(' - ', '\n');
              }
              return tick;
            }}
            tickLabelProps={() => ({
              fill: black,
              fontSize: 11,
              width: 20,
              y: 15,
              textAnchor: 'middle',
              verticalAnchor: 'start',
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
