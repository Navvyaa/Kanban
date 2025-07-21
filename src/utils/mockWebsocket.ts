import { store } from '../redux/store';
import { addTask, moveTask } from '../features/tasks/taskSlice';
import { nanoid } from '@reduxjs/toolkit';
import { users } from '../data/users';
import toast from 'react-hot-toast';

const columnIds = store.getState().columns.map(col => col.id);

function getRandomItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];

}

export function mockWebSocket(interval = 8000) {
    const intervalId = setInterval(() => {
        const actionType = Math.random() < 0.5 ? 'add' : 'move';
        if (actionType === 'add') {
            const newTask = {
                id: nanoid(),
                title: `New Task ${Math.floor(Math.random() * 1000)}`,
                assignee: getRandomItem(users).name,
                priority: getRandomItem(['low', 'medium', 'high']) as "low" | "medium" | "high",
                columnId: getRandomItem(columnIds)
            }
            store.dispatch(addTask(newTask));
            toast.success(`${newTask.title} added to ${newTask.columnId}`);
        }
        if (actionType === 'move') {
            const tasks = store.getState().tasks.present;
            if (tasks.length > 0) {
                const task = getRandomItem(tasks);
                let newColId = getRandomItem(columnIds.filter(id => id !== task.columnId));
                store.dispatch(moveTask({ taskId: task.id, columnId: newColId }));
                toast.success(`${task.title} moved to ${newColId}`);
            }
        }
    }, interval);

    
    return () => clearInterval(intervalId);
}