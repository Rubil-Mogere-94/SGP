const BASE_URL = 'https://smart-backend-vvbe.onrender.com';

export const fetchGoals = async () => {
  const response = await fetch(`${BASE_URL}/goals`);
  return response.json();
};

export const createGoal = async (goal) => {
  const response = await fetch(`${BASE_URL}/goals`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(goal),
  });
  return response.json();
  
};

export const updateGoal = async (id, goal) => {
  const response = await fetch(`${BASE_URL}/goals/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(goal),
  });
  return response.json();
};

export const deleteGoal = async (id) => {
  await fetch(`${BASE_URL}/goals/${id}`, {
    method: 'DELETE',
  });
  return id;
};

export const fetchDeposits = async () => {
  const response = await fetch(`${BASE_URL}/deposits`);
  return response.json();
};

export const createDeposit = async (deposit) => {
  const response = await fetch(`${BASE_URL}/deposits`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(deposit),
  });
  return response.json();
};

export const deleteDeposit = async (id) => {
  await fetch(`${BASE_URL}/deposits/${id}`, {
    method: 'DELETE',
  });
  return id;
};