import DonutChart from '@/components/DonutChart';
import BarChart from '@/components/BarChart';
import HeatMap from '@/components/HeatMap';
import GoalHealthTable from '@/components/GoalHealthTable';
import { useGoals } from '@/contexts/GoalContext';

export default function Overview() {
  const { state } = useGoals();
  
  if (state.loading) return <div className="text-center py-8">Loading overview...</div>;
  if (state.error) return <div className="text-red-500 text-center py-8">Error: {state.error}</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="neumorphic p-4"><DonutChart data={state.goals} /></div>
      <div className="neumorphic p-4"><BarChart data={state.goals} /></div>
      <div className="neumorphic p-4 lg:col-span-2"><HeatMap data={state.deposits} /></div>
      <div className="neumorphic p-4 lg:col-span-2"><GoalHealthTable goals={state.goals} /></div>
    </div>
  );
}