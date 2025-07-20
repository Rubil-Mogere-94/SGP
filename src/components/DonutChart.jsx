import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#00C4FF', '#14E956', '#F8F9FD', '#23272F'];

export default function DonutChart({ data }) {
  const total = data.reduce((sum, g) => sum + g.targetAmount, 0);
  const saved = data.reduce((sum, g) => sum + g.savedAmount, 0);
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie data={[{ name: 'Saved', value: saved }, { name: 'Remaining', value: total - saved }]} innerRadius="60%" outerRadius="80%" dataKey="value">
          <Cell fill={COLORS[1]} />
          <Cell fill={COLORS[0]} />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
