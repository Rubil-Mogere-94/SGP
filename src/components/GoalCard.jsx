import { useGoals } from '@/contexts/GoalContext';
import { useRef, useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { differenceInDays, isPast } from 'date-fns';

export default function GoalCard({ goal }) {
  const { actions } = useGoals();
  const cardRef = useRef(null);
  const [dims, setDims] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (cardRef.current) {
      setDims({ width: cardRef.current.offsetWidth, height: cardRef.current.offsetHeight });
    }
  }, []);

  const percent = Math.min(100, ((goal.savedAmount / goal.targetAmount) * 100).toFixed(0));
  const daysLeft = differenceInDays(new Date(goal.deadline), new Date());
  const status = isPast(goal.deadline)
    ? 'Overdue'
    : percent >= 100
    ? 'Completed'
    : daysLeft < 30
    ? 'Warning'
    : 'On Track';

  return (
    <div
      ref={cardRef}
      className={`neumorphic relative ${
        status === 'Overdue'
          ? 'border-2 border-red-500'
          : status === 'Warning'
          ? 'border-2 border-amber-500'
          : ''
      }`}
    >
      {status === 'Completed' && <div className="absolute top-2 right-2">✅</div>}
      {status === 'Overdue' && (
        <div className="absolute top-2 left-2 bg-red-500 text-white px-2">Overdue</div>
      )}

      <h3 className="text-xl font-semibold">{goal.name}</h3>
      <p className="text-sm text-gray-500">{goal.category}</p>

      <div className="w-full bg-gray-200 rounded-full h-2 my-2">
        <div className="bg-primary h-2 rounded-full" style={{ width: `${percent}%` }} />
      </div>

      <p className="text-sm">
        KES {goal.savedAmount} / KES {goal.targetAmount} ({percent}%)
      </p>
      <p className="text-xs text-gray-500">
        {daysLeft >= 0 ? `${daysLeft} days left` : 'Past deadline'}
      </p>

      <div className="mt-2 flex space-x-2">
        <button onClick={() => actions.openEditModal(goal)} className="btn btn-sm btn-outline">
          Edit
        </button>
        <button onClick={() => actions.deleteGoal(goal.id)} className="btn btn-sm btn-error">
          Delete
        </button>
        <button onClick={() => actions.openDepositDrawer(goal.id)} className="btn btn-sm btn-primary">
          Deposit
        </button>
      </div>

      {status === 'Completed' && (
        <Confetti width={dims.width} height={dims.height} recycle={false} numberOfPieces={100} gravity={0.2} />
      )}
    </div>
  );
}