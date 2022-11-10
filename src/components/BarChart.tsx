import appleStock, { AppleStock } from '@visx/mock-data/lib/mocks/appleStock';
import useMeasure from 'react-use-measure';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Group } from '@visx/group';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { Bar } from '@visx/shape';
import { defaultStyles, useTooltip, TooltipWithBounds, useTooltipInPortal } from '@visx/tooltip';
import { TouchEvent, MouseEvent } from 'react';
import { localPoint } from '@visx/event';
import { timeFormat } from 'd3-time-format';
// data
const data = appleStock.slice(0, 10);

// margins
const margin = 32;

// width and height
const defaultWidth = 500;
const defaultHeight = 300;

// selectors
const getXValue = (d: AppleStock) => d.date;
const getYValue = (d: AppleStock) => d.close;

const tooltipStyles = {
  ...defaultStyles,
  boderRadius: 4,
  background: 'black',
  color: 'white',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen"',
};

const Example = () => {
  const [ref, bounds] = useMeasure();
  const { showTooltip, hideTooltip, tooltipData, tooltipLeft, tooltipTop } =
    useTooltip<AppleStock>();
  const { containerRef, TooltipInPortal } = useTooltipInPortal();

  const width = bounds.width || defaultWidth;
  const height = bounds.height || defaultHeight;

  const innerWidth = width - margin * 2;
  const innerHeight = height - margin * 2;

  const xScale = scaleBand<string>({
    range: [margin, innerWidth],
    domain: data.map(getXValue),
    padding: 0.2,
  });

  const yScale = scaleLinear<number>({
    range: [innerHeight, margin],
    domain: [Math.min(...data.map(getYValue)) - 2, Math.max(...data.map(getYValue)) + 2],
  });

  type DateTimeFormatOptions = {
    weekday?: string;
    month?: string;
    year?: string;
  };

  return (
    <div ref={ref}>
      <svg ref={containerRef} width='100%' height='100%' viewBox={`0 0 ${width} ${height}`}>
        <Group>
          {data.map((d) => {
            const xValue = getXValue(d);
            const barWidth = xScale.bandwidth();
            const barHeight = innerHeight - (yScale(getYValue(d)) ?? 0);
            const barX = xScale(xValue);
            const barY = innerHeight - barHeight;

            return (
              <Bar
                key={`bar-${xValue}`}
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill='orange'
                onMouseMove={(event: TouchEvent<SVGRectElement> | MouseEvent<SVGRectElement>) => {
                  const point = localPoint(event);

                  if (!point) return;

                  showTooltip({
                    tooltipData: d,
                    tooltipLeft: point.x - 60,
                    tooltipTop: point.y - 40,
                  });
                }}
                onMouseLeave={() => hideTooltip()}
              />
            );
          })}
        </Group>
        <Group>
          <AxisBottom
            top={innerHeight}
            scale={xScale}
            tickFormat={(date) =>
              new Date(date).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })
            }
          />
        </Group>
        <Group>
          <AxisLeft left={margin} scale={yScale} />
        </Group>
      </svg>
      {tooltipData ? (
        <TooltipInPortal
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          <b>
            {new Date(getXValue(tooltipData)).toLocaleDateString('nl-NL', {
              day: 'numeric',
              month: 'short',
              year: '2-digit',
            })}
          </b>{' '}
          : $ {getYValue(tooltipData)}
        </TooltipInPortal>
      ) : null}
    </div>
  );
};

export default Example;
