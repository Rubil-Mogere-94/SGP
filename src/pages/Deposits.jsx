import { CSVLink } from 'react-csv';
import { useGoals } from '@/contexts/GoalContext';

export default function Deposits() {
  const { state } = useGoals();
  const headers = [
    { label: 'ID', key: 'id' },
    { label: 'Goal ID', key: 'goalId' },
    { label: 'Amount', key: 'amount' },
    { label: 'Timestamp', key: 'timestamp' }
  ];
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Transaction Log</h2>
      <CSVLink data={state.deposits} headers={headers} filename="deposits.csv" className="btn btn-outline mb-4">
        Export CSV
      </CSVLink>
      <ul className="space-y-2">
        {state.deposits.map(d => (
          <li key={d.id} className="neumorphic p-2 flex justify-between">
            <span>Goal {d.goalId}</span>
            <span>+KES {d.amount}</span>
            <span>{new Date(d.timestamp).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}