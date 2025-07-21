// import react from 'react';
import { useState, useEffect } from 'react';
import Column from './Column';
import FilterPanel from './FilterPanel';
import { useAppSelector, useAppDispatch } from '../hooks/useReduxHooks';
import type { ColumnType, TaskType } from '../types';
import type { RootState } from '../redux/store';
import TaskModal from './TaskModal';
import { deleteTask, moveTask } from '../features/tasks/taskSlice';
import {  Loader,Undo,Redo } from "lucide-react";
import { ActionCreators } from 'redux-undo';


const KanbanBoard: React.FC = () => {
  const dispatch = useAppDispatch();
  const columns: ColumnType[] = useAppSelector((state: RootState) => state.columns);
  const tasks: TaskType[] = useAppSelector((state: RootState) => state.tasks.present);
  const filters = useAppSelector((state: RootState) => state.filters);
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<TaskType | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const taskHistory=useAppSelector((state:RootState)=> state.tasks)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

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

  
  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-neutral-800 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <Loader size={40} className="w-12 h-12 text-blue-500 animate-spin" />            
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3 justify-center">             
              Loading Kanban Board
            </h2>
            <p className="text-neutral-400">Preparing your workspace...</p>
          </div>          
        </div>
      </div>
    );
  }

  return (
    <div className='w-full min-h-screen relative text-white bg-neutral-500  flex flex-col'>
      <div className=" bg-neutral-800/80 backdrop-blur-md ">
        <div className=" bg-transparent   py-6 flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center sm:items-center gap-4">
            <div>
              <h1 className="lg:text-3xl text-xl text-center font-bold text-white mb-2 flex items-center gap-8 justify-center">
                Kanban Board
              </h1>
              <p className="text-neutral-400">
                Manage your tasks efficiently with drag & drop
              </p>
            </div>
            <div className="text-sm text-neutral-400 text-center">
              Total Tasks: <span className="text-white font-semibold">{tasks.length}</span>
            </div>
          </div>
        </div>
        </div>
        <div className=' bg-neutral-800/80 backdrop-blur-md mb-5 border-b border-neutral-700 sticky  top-0 z-40 flex flex-col justify-start lg:flex-row lg:justify-between lg:items-center items-start gap-4'>
          <FilterPanel />
          <div className='flex gap-6 px-4 mb-2 texxt-sm mr-6'>
              <button
              onClick={()=>dispatch(ActionCreators.undo())}
              disabled={taskHistory.past.length===0}
              className=' bg-neutral-800 border border-neutral-900 px-2 flex gap-3 items-center py-1 rounded-lg hover:border-neutral-700'
              >
                <Undo size={16}/><span>Undo</span>
                
              </button>
              <button
              onClick={()=>dispatch(ActionCreators.redo())}
              disabled={taskHistory.future.length === 0}
              className=' bg-neutral-800 border border-neutral-900 py-1  px-2 rounded-lg flex gap-3 items-center hover:border-neutral-700'
              >
                <Redo size={16}/> <span>Redo</span>                
              </button>
          </div>
        </div>
      {/* </div> */}



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