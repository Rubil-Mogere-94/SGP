import { Routes, Route } from 'react-router-dom';
import LeftNav from '@/components/LeftNav';
import TopBar from '@/components/TopBar';
import Overview from '@/pages/Overview';
import Goals from '@/pages/Goals';
import Deposits from '@/pages/Deposits';
import Settings from '@/pages/Settings';
import AddEditGoalModal from '@/components/AddEditGoalModal';
import DepositDrawer from '@/components/DepositDrawer';

export default function App() {
  return (
    <div className="flex h-screen bg-background">
      <LeftNav />
      <div className="flex flex-col flex-1">
        <TopBar />
        <main className="p-4 overflow-auto">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/deposits" element={<Deposits />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
        <AddEditGoalModal />
        <DepositDrawer />
      </div>
    </div>
  );
}