import { reducer } from '@/contexts/GoalContext';

const initial = { past: [], present: { goals: [], deposits: [] }, future: [] };

test('should load data', () => {
  const data = { goals: [{ id:1,name:'x',targetAmount:10,savedAmount:0 }], deposits: [] };
  const state = reducer(initial, { type: 'LOAD', payload: data });
  expect(state.present).toEqual(data);
});

test('add goal', () => {
  const newGoal = { id:2,name:'y',targetAmount:20,savedAmount:0 };
  const s1 = reducer(initial, { type:'LOAD', payload: { goals:[], deposits:[] } });
  const s2 = reducer(s1, { type:'ADD_GOAL', goal:newGoal });
  expect(s2.present.goals).toContainEqual(newGoal);
});
