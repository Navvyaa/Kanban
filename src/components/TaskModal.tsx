import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, editTask } from '../features/tasks/taskSlice';
import type { TaskType } from '../types/index';
import { users } from '../data/users';
import { AlertCircle, Save, X } from 'lucide-react';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTask?: TaskType;
  columnId: string;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, initialTask, columnId }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [assignee, setAssignee] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setAssignee(initialTask.assignee);
      setPriority(initialTask.priority);
    } else {
      setTitle('');
      setAssignee('');
      setPriority('medium');
    }
  }, [initialTask]);

  const handleSubmit = () => {

    if (!assignee || !priority || !title.trim()) {
      setError("Please fill all Fields");
      return;
    }

    const task: TaskType = {
      id: initialTask ? initialTask.id : "",
      title,
      assignee,
      priority,
      columnId,
    };

    if (initialTask) {
      dispatch(editTask(task));
    } else {
      dispatch(addTask(task));
    }

    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };


  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 text-neutral-300"
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className="bg-neutral-800 p-6 rounded-lg shadow-md  py-8 border border-neutral-900 
       w-full max-w-md mx-auto transform transition-all duration-300 animate-fadeIn"
        onKeyDown={handleKeyPress}>
        <div className="flex items-center justify-between p-3 border-b border-neutral-700 mb-3">
          <h2 className="text-xl font-bold text-white">
            {initialTask ? '✏️ Edit Task' : '➕ Add New Task'}
          </h2>
          <button
            onClick={onClose}
            className="
              p-2 rounded-lg text-neutral-400 hover:text-white 
              hover:bg-neutral-700 transition-all duration-200
            "
          >
            <X size={20} />
          </button>
        </div>
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Task Title:
          </label>
          <input
            required
            className="border bg-neutral-700 w-full my-2 p-2 rounded-lg  focus:border-neutral-800 focus:outline-none"
            placeholder="Enter task title..."
            value={title}
            maxLength={80}
            onChange={(e) => (
              setTitle(e.target.value),
              setError(""))}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-white mb-2">Assignee: </label>
          <select
            value={assignee}
            required
            onChange={(e) => setAssignee(e.target.value)}
            className='border w-full my-4 p-2 rounded-lg bg-neutral-700 focus:border-neutral-800'>
            <option value="">Select Assignee</option>
            {users.map((user, _) => (
              <option key={user.id} className='capitalize' value={user.name}>{user.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className='block text-sm font-semibold text-white mb-2'>Priority: </label>
        
        <div className="grid grid-cols-3 gap-4">
              {(['low', 'medium', 'high'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`
                    p-2 rounded-lg text-base font-semibold capitalize
                    border-2 transition-all duration-200 
                    ${priority === p
                      ? p === 'high' ? 'bg-red-400 border-red-300 text-white'
                        : p === 'medium' ? 'bg-yellow-500 border-yellow-300 text-white'
                        : 'bg-green-500 border-green-300 text-white'
                      : 'bg-neutral-700 border-neutral-600 text-neutral-300 hover:border-neutral-500'
                    }
                  `}
                >
                 {p}
                </button>
              ))}
            </div>
            </div>
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg">
              <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
              <span className="text-red-300 text-base">{error}</span>
            </div>
        )}

        <div className="flex justify-end space-x-2 mt-5">

          <button 
            onClick={handleSubmit} 
            className="
              flex items-center gap-2 px-6 py-2 
              bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg
              transition-all duration-200 hover:scale-105 active:scale-95
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            <Save size={16} />
            {initialTask ? 'Update Task' : 'Create Task'}
          </button>

        </div>
      </div>
    </div>
  );
};

export default TaskModal;
