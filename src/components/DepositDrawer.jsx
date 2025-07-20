import { useEffect, useState } from 'react';
import { useGoals } from '@/contexts/GoalContext';

export default function DepositDrawer() {
  const { state, actions } = useGoals();
  const { depositDrawerOpen, depositGoalId } = state.ui;
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (!depositDrawerOpen) setAmount(0);
  }, [depositDrawerOpen]);

  if (!depositDrawerOpen) return null;
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white p-4 glass">
      <h2 className="text-lg font-semibold mb-2">Make a Deposit</h2>
      <select
        value={depositGoalId || ''}
        onChange={e => actions.openDepositDrawer(+e.target.value)}
        className="select w-full mb-2"
      >
        <option value="">Select goal</option>
        {state.goals.map(g => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        value={amount}
        onChange={e => setAmount(+e.target.value)}
        placeholder="Amount"
        className="input w-full mb-2"
      />
      <div className="flex space-x-2 mb-4">
        {[100, 500, 1000].map(a => (
          <button key={a} onClick={() => setAmount(amount + a)} className="btn btn-sm btn-outline">
            +{a}
          </button>
        ))}
      </div>
      <div className="flex justify-end space-x-2">
        <button onClick={actions.closeDepositDrawer} className="btn btn-outline">
          Cancel
        </button>
        <button onClick={() => actions.addDeposit(depositGoalId, amount)} className="btn btn-primary">
          Deposit
        </button>
      </div>
    </div>
  );
}