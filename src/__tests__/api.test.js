import { fetchGoals } from '@/api/api';
import { vi } from 'vitest';

global.fetch = vi.fn(() =>
  Promise.resolve({ ok: true, json: () => Promise.resolve([{ id:1 }]) })
);

test('fetchGoals returns data', async () => {
  const data = await fetchGoals();
  expect(data).toEqual([{ id:1 }]);
});
