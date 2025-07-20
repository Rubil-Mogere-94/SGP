import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { subDays, format } from 'date-fns';

export default function HeatMap({ data }) {
  // Aggregate deposits by date
  const counts = data.reduce((acc, { timestamp }) => {
    const date = format(new Date(timestamp), 'yyyy-MM-dd');
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const values = Object.entries(counts).map(([date, count]) => ({ date, count }));

  return (
    <div className="overflow-auto">
      <CalendarHeatmap
        startDate={subDays(new Date(), 364)}
        endDate={new Date()}
        values={values}
        classForValue={(value) =>
          !value ? 'color-empty' : `color-scale-${Math.min(value.count, 4)}`
        }
        tooltipDataAttrs={(value) =>
          value.date
            ? { 'data-tip': `${value.date} — ${value.count} deposits` }
            : {}
        }
        showWeekdayLabels
      />
    </div>
  );
}