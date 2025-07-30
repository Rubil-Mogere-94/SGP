import React, { createContext, useState, useEffect, useCallback } from 'react';
import * as api from '@/api';

const GoalContext = createContext();

export function GoalProvider({ children }) {
  const [state, setState] = useState({
    goals: [],
    deposits: [],
    ui: {
      modalOpen: false,
      editingGoal: null,
      depositDrawerOpen: false,
      depositGoalId: null,
    },
    loading: true,
    error: null,
  });

  const refreshData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const [goals, deposits] = await Promise.all([
        api.fetchGoals(),
        api.fetchDeposits()
      ]);
      setState(prev => ({ ...prev, goals, deposits, loading: false }));
    } catch (error) {
      setState(prev => ({ ...prev, error: error.message, loading: false }));
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const actions = {
    openAddModal: () => setState(prev => ({
      ...prev,
      ui: { ...prev.ui, modalOpen: true, editingGoal: null }
    })),
    
    openEditModal: (editingGoal) => setState(prev => ({
      ...prev,
      ui: { ...prev.ui, modalOpen: true, editingGoal }
    })),
    
    closeModal: () => setState(prev => ({
      ...prev,
      ui: { ...prev.ui, modalOpen: false, editingGoal: null }
    })),
    
    openDepositDrawer: (depositGoalId) => setState(prev => ({
      ...prev,
      ui: { ...prev.ui, depositDrawerOpen: true, depositGoalId }
    })),
    
    closeDepositDrawer: () => setState(prev => ({
      ...prev,
      ui: { ...prev.ui, depositDrawerOpen: false, depositGoalId: null }
    })),
    
    addGoal: async (goalData) => {
      try {
        await api.createGoal(goalData);
        await refreshData();
        return true;
      } catch (error) {
        setState(prev => ({ ...prev, error: error.message }));
        return false;
      }
    },
    
    updateGoal: async (id, goalData) => {
      try {
        await api.updateGoal(id, goalData);
        await refreshData();
        return true;
      } catch (error) {
        setState(prev => ({ ...prev, error: error.message }));
        return false;
      }
    },
    
    deleteGoal: async (id) => {
      try {
        // Delete associated deposits first
        const depositsToDelete = state.deposits
          .filter(d => d.goalId === id)
          .map(d => d.id);
        
        await Promise.all(depositsToDelete.map(api.deleteDeposit));
        await api.deleteGoal(id);
        await refreshData();
        return true;
      } catch (error) {
        setState(prev => ({ ...prev, error: error.message }));
        return false;
      }
    },
    
    addDeposit: async (goalId, amount) => {
      try {
        await api.createDeposit({
          goalId,
          amount,
          timestamp: new Date().toISOString()
        });
        await refreshData();
        return true;
      } catch (error) {
        setState(prev => ({ ...prev, error: error.message }));
        return false;
      }
    },
    
    refreshData
  };

  const value = { state, actions };

  return (
    <GoalContext.Provider value={value}>
      {children}
    </GoalContext.Provider>
  );
}

export function useGoals() {
  const context = React.useContext(GoalContext);
  if (context === undefined) {
    throw new Error('useGoals must be used within a GoalProvider');
  }
  return context;
}
