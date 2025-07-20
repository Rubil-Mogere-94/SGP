import { differenceInDays, isPast } from 'date-fns';

export default function GoalHealthTable({ goals }) {
  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th>Name</th>
          <th>Days Left</th>
          <th>Status</th>
          <th>Next Deposit</th>
        </tr>
      </thead>
      <tbody>
        {goals.map(g => {
          const days = differenceInDays(new Date(g.deadline), new Date());
          const status = isPast(g.deadline) ? 'Overdue' : g.savedAmount >= g.targetAmount ? 'Completed' : days < 30 ? 'Warning' : 'On Track';
          const next = Math.ceil((g.targetAmount - g.savedAmount) / Math.max(days, 1));
          return (
            <tr key={g.id}>
              <td>{g.name}</td>
              <td>{days >= 0 ? days : '—'}</td>
              <td>{status}</td>
              <td>{status === 'On Track' ? `KES ${next}` : '—'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
