import * as d3 from "d3";
import { format } from "date-fns";
import { CSSProperties } from "react";
import { User } from "@prisma/client";

export function generateChartData(users: User[]) {
  let today = new Date();
  let data = [];

  const dates = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d;
  });

  for (var day of dates) {
    let count = 0;
    for (var user of users) {
      const userJoinedOn = new Date(user.created.toDateString());
      const compareDate = new Date(day.toDateString());

      if (
        userJoinedOn.getDate() == compareDate.getDate() &&
        userJoinedOn.getMonth() == compareDate.getMonth() &&
        userJoinedOn.getFullYear() == compareDate.getFullYear()
      ) {
        count++;
      }
    }

    data.push({
      date: day,
      value: count,
    });
  }

  return data.reverse();
}

export function Chart({ data }: { data: { value: number; date: Date }[] }) {
  let xScale = d3
    .scaleTime()
    .domain([data[0].date, data[data.length - 1].date])

    .range([0, 100]);
  let yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data.map((d) => d.value)) ?? 0])
    .range([100, 0]);

  let line = d3
    .line<(typeof data)[number]>()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.value));

  let d = line(data);

  if (!d) {
    return null;
  }

  return (
    <div
      className="@container relative h-full w-full"
      style={
        {
          "--marginTop": "6px",
          "--marginRight": "8px",
          "--marginBottom": "25px",
          "--marginLeft": "25px",
        } as CSSProperties
      }
    >
      {/* X axis */}
      <svg
        className="absolute inset-0
          h-[calc(100%-var(--marginTop))]
          w-[calc(100%-var(--marginLeft)-var(--marginRight))]
          translate-x-[var(--marginLeft)]
          translate-y-[var(--marginTop)]
          overflow-visible
        "
      >
        {data.map((day, i) => (
          <g key={i} className="overflow-visible font-medium text-zinc-400">
            <text
              x={`${xScale(day.date)}%`}
              y="100%"
              textAnchor={
                i === 0 ? "start" : i === data.length - 1 ? "end" : "middle"
              }
              fill="currentColor"
              className="@sm:inline hidden text-sm"
            >
              {format(day.date, "EEE")}
            </text>
            <text
              x={`${xScale(day.date)}%`}
              y="100%"
              textAnchor={
                i === 0 ? "start" : i === data.length - 1 ? "end" : "middle"
              }
              fill="currentColor"
              className="@sm:hidden text-xs"
            >
              {format(day.date, "EEEEE")}
            </text>
          </g>
        ))}
      </svg>

      {/* Y axis */}
      <svg
        className="absolute inset-0
          h-[calc(100%-var(--marginTop)-var(--marginBottom))]
          translate-y-[var(--marginTop)]
          overflow-visible
        "
      >
        <g className="translate-x-4">
          {yScale
            .ticks(8)
            .map(yScale.tickFormat(8, "d"))
            .map((value, i) => (
              <text
                key={i}
                y={`${yScale(+value)}%`}
                alignmentBaseline="middle"
                textAnchor="end"
                className="text-xs tabular-nums text-zinc-500"
                fill="currentColor"
              >
                {value}
              </text>
            ))}
        </g>
      </svg>

      {/* Chart area */}
      <svg
        className="absolute inset-0
          h-[calc(100%-var(--marginTop)-var(--marginBottom))]
          w-[calc(100%-var(--marginLeft)-var(--marginRight))]
          translate-x-[var(--marginLeft)]
          translate-y-[var(--marginTop)]
          overflow-visible
        "
      >
        <svg
          viewBox="0 0 100 100"
          className="overflow-visible"
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          {yScale
            .ticks(8)
            .map(yScale.tickFormat(8, "d"))
            .map((active, i) => (
              <g
                transform={`translate(0,${yScale(+active)})`}
                className="text-zinc-500"
                key={i}
              >
                <line
                  x1={0}
                  x2={100}
                  stroke="currentColor"
                  strokeDasharray="6,5"
                  strokeWidth={0.5}
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            ))}

          {/* Line */}
          <path
            d={d}
            fill="none"
            className="text-zinc-500"
            stroke="currentColor"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          
        </svg>
      </svg>
    </div>
  );
}
