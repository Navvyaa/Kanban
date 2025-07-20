// import react from 'react';
import { useState } from 'react';
import Column from './Column';
import FilterPanel from './FilterPanel';
import { useAppSelector, useAppDispatch } from '../hooks/useReduxHooks';
import type { ColumnType, TaskType } from '../types';
import type { RootState } from '../redux/store';
import TaskModal from './TaskModal';
import { deleteTask, moveTask } from '../features/tasks/taskSlice';
import { Presentation } from "lucide-react";


const KanbanBoard: React.FC = () => {
  const dispatch = useAppDispatch();
  const columns: ColumnType[] = useAppSelector((state: RootState) => state.columns);
  const tasks: TaskType[] = useAppSelector((state: RootState) => state.tasks);
  const filters = useAppSelector((state: RootState) => state.filters);
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<TaskType | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  const handleEditTask = (task: TaskType) => {
    setEditingTask(task);
    setActiveColumnId(task.columnId);
  };

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask(taskId));
  };

  const handleCloseModal = () => {
    setActiveColumnId(null);
    setEditingTask(null);
  };


  const handleDrop = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');

    if (taskId && columnId) {
      dispatch(moveTask({ taskId, columnId }));
    }
    setDragOverColumn(null);
  }

  const handleColumnDragOver = (columnId: string) => {
    setDragOverColumn(columnId);
  }

  const getFilteredTasks = (columnId: string) => {
    return tasks.filter(
      (task) =>
        task.columnId === columnId &&
        (!filters.priority || task.priority === filters.priority) &&
        (!filters.assignee || task.assignee === filters.assignee)

    )
  }
  return (
    <div className='w-full min-h-screen relative text-white bg-neutral-600  flex flex-col'>
      <div className="sticky  top-0 z-40 bg-neutral-800/80 backdrop-blur-md mb-5 border-b border-neutral-700">
        <div className=" bg-transparent   py-6 flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center sm:items-center gap-4">
            <div>
              <h1 className="text-3xl text-center font-bold text-white mb-2 flex items-center gap-8 justify-center">
                <Presentation size={30}/> <span>Kanban Board</span> 
              </h1>
              <p className="text-neutral-400">
                Manage your tasks efficiently with drag & drop
              </p>
            </div>
            <div className="text-sm text-neutral-400">
              Total Tasks: <span className="text-white font-semibold">{tasks.length}</span>
            </div>
          </div>
        </div>
        <div className='ml-4'>
          <FilterPanel />
        </div>
      </div>



      {/* <div className='container mx-auto py-8'> */}
        <div className=' flex flex-col lg:flex-row h-full lg:justify-center gap-4 mb-4 '>
          {columns.map((column) => {
            
            const columnTasks = getFilteredTasks(column.id);
            return (
            <Column
             key={column.id}
                column={column}
                tasks={columnTasks}
                onAddTask={(id) => setActiveColumnId(id)}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
                onDragOver={() => handleColumnDragOver(column.id)}
                onDrop={handleDrop}
                isDragOver={dragOverColumn === column.id}
            />
            );
          })}
        </div>
      {/* </div> */}

      {activeColumnId && (
        <TaskModal
          isOpen={true}
          columnId={activeColumnId}
          initialTask={editingTask || undefined}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}

export default KanbanBoard;