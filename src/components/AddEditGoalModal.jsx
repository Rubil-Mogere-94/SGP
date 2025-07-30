import { useState, useEffect } from 'react';
import { useGoals } from '@/contexts/GoalContext';

const emptyForm = { id: null, name: '', category: '', targetAmount: '', deadline: '' };

export default function AddEditGoalModal() {
  const { state, actions } = useGoals();
  const { modalOpen, editingGoal } = state.ui;
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (modalOpen) {
      if (editingGoal) {
        setForm({
          id: editingGoal.id,
          name: editingGoal.name,
          category: editingGoal.category,
          targetAmount: editingGoal.targetAmount,
          deadline: editingGoal.deadline
        });
      } else {
        setForm(emptyForm);
      }
    }
  }, [modalOpen, editingGoal]);

  const handleSubmit = e => {
    e.preventDefault();
    const { id, ...data } = form;
    
    if (
      !form.name ||
      !form.category ||
      form.targetAmount <= 0 ||
      new Date(form.deadline) < new Date()
    ) {
      return;
    }
    
    const payload = { ...data, targetAmount: +data.targetAmount };
    
    if (id) {
      actions.updateGoal(id, payload);
    } else {
      actions.addGoal(payload);
    }
    
    actions.closeModal();
  };

  if (!modalOpen) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg w-96 glass"
      >
        <h2 className="text-xl font-bold mb-4">
          {editingGoal ? 'Edit Goal' : 'New Goal'}
        </h2>
        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="input w-full mb-2"
          required
        />
        <input
          placeholder="Category"
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
          className="input w-full mb-2"
          required
        />
        <input
          type="number"
          placeholder="Target Amount"
          value={form.targetAmount}
          onChange={e => setForm({ ...form, targetAmount: e.target.value })}
          className="input w-full mb-2"
          required
          min="1"
        />
        <input
          type="date"
          value={form.deadline}
          onChange={e => setForm({ ...form, deadline: e.target.value })}
          className="input w-full mb-4"
          required
        />
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={actions.closeModal}
            className="btn btn-outline"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}