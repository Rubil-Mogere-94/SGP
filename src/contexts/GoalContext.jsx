import React, { createContext, useContext, useEffect, useReducer } from 'react';
import * as api from '@/api/api';

const initialState = {
  past: [],
  present: {
    goals: [],
    deposits: [],
    ui: {
      modalOpen: false,
      editingGoal: null,
      depositDrawerOpen: false,
      depositGoalId: null
    }
  },
  future: []
};

function reducer(state, action) {
  const { past, present, future } = state;
  switch (action.type) {
    case 'LOAD':
      return {
        past: [],
        present: {
          ...action.payload,
          ui: { modalOpen: false, editingGoal: null, depositDrawerOpen: false, depositGoalId: null }
        },
        future: []
      };
    case 'OPEN_ADD_MODAL':
      return { ...state, present: { ...present, ui: { ...present.ui, modalOpen: true } } };
    case 'OPEN_EDIT_MODAL':
      return { ...state, present: { ...present, ui: { ...present.ui, modalOpen: true, editingGoal: action.goal } } };
    case 'CLOSE_MODAL':
      return { ...state, present: { ...present, ui: { ...present.ui, modalOpen: false, editingGoal: null } } };
    case 'OPEN_DEPOSIT_DRAWER':
      return { ...state, present: { ...present, ui: { ...present.ui, depositDrawerOpen: true, depositGoalId: action.goalId } } };
    case 'CLOSE_DEPOSIT_DRAWER':
      return { ...state, present: { ...present, ui: { ...present.ui, depositDrawerOpen: false, depositGoalId: null } } };
    case 'ADD_GOAL':
      return { past: [...past, present], present: { ...present, goals: [...present.goals, action.goal] }, future: [] };
    case 'UPDATE_GOAL':
      return {
        past: [...past, present],
        present: {
          ...present,
          goals: present.goals.map(g => (g.id === action.id ? { ...g, ...action.changes } : g))
        },
        future: []
      };
    case 'DELETE_GOAL':
      return {
        past: [...past, present],
        present: { ...present, goals: present.goals.filter(g => g.id !== action.id) },
        future: []
      };
    case 'ADD_DEPOSIT':
      return {
        past: [...past, present],
        present: {
          ...present,
          goals: present.goals.map(g =>
            g.id === action.deposit.goalId
              ? { ...g, savedAmount: g.savedAmount + action.deposit.amount }
              : g
          ),
          deposits: [...present.deposits, action.deposit]
        },
        future: []
      };
    case 'UNDO':
      if (!past.length) return state;
      return { past: past.slice(0, -1), present: past[past.length - 1], future: [present, ...future] };
    case 'REDO':
      if (!future.length) return state;
      return { past: [...past, present], present: future[0], future: future.slice(1) };
    default:
      return state;
  }
}

const GoalContext = createContext();

export function GoalProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    Promise.all([api.fetchGoals(), api.fetchDeposits()]).then(([goals, deposits]) =>
      dispatch({ type: 'LOAD', payload: { goals, deposits } })
    );
  }, []);

  const actions = {
    openAddModal: () => dispatch({ type: 'OPEN_ADD_MODAL' }),
    openEditModal: goal => dispatch({ type: 'OPEN_EDIT_MODAL', goal }),
    closeModal: () => dispatch({ type: 'CLOSE_MODAL' }),
    openDepositDrawer: goalId => dispatch({ type: 'OPEN_DEPOSIT_DRAWER', goalId }),
    closeDepositDrawer: () => dispatch({ type: 'CLOSE_DEPOSIT_DRAWER' }),

    addGoal: async goal => {
      const newGoal = await api.addGoal({ ...goal, savedAmount: 0, createdAt: new Date().toISOString() });
      dispatch({ type: 'ADD_GOAL', goal: newGoal });
      dispatch({ type: 'CLOSE_MODAL' });
    },
    updateGoal: async (id, changes) => {
      const updated = await api.updateGoal(id, changes);
      dispatch({ type: 'UPDATE_GOAL', id, changes: updated });
      dispatch({ type: 'CLOSE_MODAL' });
    },
    deleteGoal: async id => {
      await api.deleteGoal(id);
      dispatch({ type: 'DELETE_GOAL', id });
    },
    addDeposit: async (goalId, amount) => {
      const deposit = { goalId, amount, timestamp: new Date().toISOString() };
      const savedDeposit = await api.addDeposit(deposit);
      const goal = state.present.goals.find(g => g.id === goalId);
      await api.updateGoal(goalId, { savedAmount: goal.savedAmount + amount });
      dispatch({ type: 'ADD_DEPOSIT', deposit: savedDeposit });
      dispatch({ type: 'CLOSE_DEPOSIT_DRAWER' });
    },
    undo: () => dispatch({ type: 'UNDO' }),
    redo: () => dispatch({ type: 'REDO' })
  };

  return (
    <GoalContext.Provider
      value={{ state: state.present, actions, canUndo: state.past.length > 0, canRedo: state.future.length > 0 }}
    >
      {children}
    </GoalContext.Provider>
  );
}

export const useGoals = () => useContext(GoalContext);
