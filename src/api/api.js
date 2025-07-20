const BASE = import.meta.env.DEV
  ? 'http://localhost:3000'
  : '';

async function handleResponse(res) {
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export const fetchGoals = () =>
  fetch(`${BASE}/goals`).then(handleResponse);

export const addGoal = goal =>
  fetch(`${BASE}/goals`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(goal)
  }).then(handleResponse);

export const updateGoal = (id, changes) =>
  fetch(`${BASE}/goals/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(changes)
  }).then(handleResponse);

export const deleteGoal = id =>
  fetch(`${BASE}/goals/${id}`, { method: 'DELETE' }).then(handleResponse);

export const fetchDeposits = () =>
  fetch(`${BASE}/deposits`).then(handleResponse);

export const addDeposit = deposit =>
  fetch(`${BASE}/deposits`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(deposit)
  }).then(handleResponse);
