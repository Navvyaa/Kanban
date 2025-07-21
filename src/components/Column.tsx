import TaskCard from "./TaskCard";
import type { ColumnType, TaskType } from "../types";
import { Plus } from 'lucide-react';

interface ColumnProps {
    column: ColumnType;
    tasks: TaskType[];
    onAddTask: (columnId: string) => void;
    onEditTask: (task: TaskType) => void;
    onDeleteTask: (taskId: string) => void;
    onDragOver: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent, columnId: string) => void;
    isDragOver: boolean;
}

const Column: React.FC<ColumnProps> = ({ column, tasks, onAddTask, onEditTask, onDeleteTask, onDrop, onDragOver, isDragOver }) => {
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        onDragOver(e);
    };
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        onDrop(e, column.id);
    };


    return (
        <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`
                text-white h-[500px] lg:h-[800px] flex flex-col 
                border border-neutral-800 w-[98%] 
                mx-1 mb-4 lg:mb-0 lg:mx-2 rounded-xl 
                bg-gradient-to-b from-neutral-800/50 to-neutral-900/50
                backdrop-blur-sm shadow-lg
                transition-all duration-300 ease-in-out
                
                hover:border-neutral-600 hover:shadow-xl
                ${isDragOver ? 'border-blue-400 bg-blue-950/20 scale-[1.02]' : ''}
            `}
        >
            <div className="flex justify-between  bg-neutral-900/80 p-4 rounded-t-xl border-b border-neutral-700 mb-3">
                <div className="flex items-center gap-3">
                    <h2 className=" font-semibold text-2xl p-2 rounded-t-2xl ">{column.title}</h2>
                    <span className="font-bold text-white text-xl">({tasks.length})</span>
                </div>
                <button
                    onClick={() => onAddTask(column.id)}
                    className="flex items-center gap-2 px-2 py-1 
                        bg-blue-500 hover:bg-blue-600  rounded-full
                        text-white text-base font-medium sm:rounded-lg
                        transition-all duration-200 hover:scale-105
                        active:scale-95 shadow-md hover:shadow-lg"
                >
                    <Plus size={16} />
                    <span className="hidden sm:inline">Add Task</span>
                </button>
            </div>
            <div className="flex-1 p-3 overflow-y-auto scrollbar-thin scrollbar-track-neutral-800 scrollbar-thumb-neutral-600">
                {tasks.length==0 ? (
                    <div className="flex flex-col items-center justify-center h-40 text-neutral">
                         <div className="text-4xl mb-2">📝</div>
                        <p className="text-sm text-center">
                            {isDragOver ? 'Drop your task here!' : 'No tasks yet. Add one to get started!'}
                        </p>
                    </div>
                ):(
                    <div>
                        {tasks.slice().reverse().map((task, index) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onEdit={onEditTask}
                                onDelete={onDeleteTask}
                                index={index}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Column;