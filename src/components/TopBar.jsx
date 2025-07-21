import { useEffect, useState } from 'react';
import { useGoals } from '@/contexts/GoalContext';

const quotes = [
  "Save today, shine tomorrow.",
  "A penny saved is a penny earned.",
  "Small steps to big dreams."
];

export default function TopBar() {
  const { state } = useGoals();
  const [quote, setQuote] = useState('');
  useEffect(() => {
    setQuote(quotes[new Date().getDate() % quotes.length]);
  }, []);
  const totalSaved = state.goals.reduce((sum, g) => sum + g.savedAmount, 0);
  const activeCount = state.goals.filter(g => g.savedAmount < g.targetAmount).length;
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow">
      <div>
        <h1 className="text-2xl font-bold"> KES {totalSaved}</h1>
        <p className="text-sm text-gray-500">{activeCount} active goals</p>
      </div>
      <div className="italic text-gray-600">“{quote}”</div>
    </header>
  );
}