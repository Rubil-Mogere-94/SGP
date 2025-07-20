import { useState } from 'react';
import { useGoals } from '@/contexts/GoalContext';
import GoalCard from '@/components/GoalCard';

export default function Goals() {
  const { state, actions } = useGoals();
  const [search, setSearch] = useState('');
  const filtered = state.goals.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-between mb-4">
        <input
          placeholder="Search goals..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input w-1/3"
        />
        <button
          onClick={actions.openAddModal}
          className="btn btn-primary"
        >
          + New Goal
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(goal => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>
    </>
  );
}