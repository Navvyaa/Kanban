import { useState } from "react";
import type { TaskType } from "../types";
import { Pencil, Trash } from 'lucide-react';

interface TaskCardProps {
    task: TaskType;
    index:number;
    onEdit: (task: TaskType) => void;
    onDelete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete,index }) => {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData('text/plain', task.id);
        e.dataTransfer.effectAllowed = 'move';
        setIsDragging(true);
    }
    const handleDragEnd = () => {
        setIsDragging(false);
    }

    return (
        <div 
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        className={`
                 cursor-move p-3 m-2 rounded-xl border-2 text-neutral-200
                transition-all duration-300 ease-in-out
                hover:scale-[1.02] hover:shadow-lg active:scale-95
                
                ${isDragging ? 'opacity-50 rotate-2 scale-95' : 'opacity-100'}
                animate-fadeIn
            `}
            style={{
                animationDelay: `${index * 50}ms`
            }}>
            <div className="flex flex-col gap-6">
                <div className="flex justify-between w-full">
                    <h3 className="font-semibold text-lg capitalize">{task.title}</h3>
                    <p
                        className={`rounded-xl tracking-wider mx-2 px-2 py-1 uppercase ${task.priority === 'high' ?
                            "bg-red-300 text-red-950" : task.priority === "medium" ? "bg-amber-300 text-amber-950" : "bg-green-300 text-green-800"
                            }`}
                    >
                        {task.priority}
                    </p>
                </div>
                <div>
                    <p className="font-semibold">Assignee: <span className="font-normal">{task.assignee}</span> </p>
                </div>
            </div>
            
            <div className="flex flex-row gap-12 justify-end mt-4">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(task);
                        }}
                        className="
                            p-2 rounded-full bg-blue-100 text-blue-600 
                            hover:bg-blue-200 hover:text-blue-700
                            transition-all duration-200 hover:scale-110
                            active:scale-95
                        "
                        title="Edit task"
                    >
                        <Pencil size={14} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(task.id);
                        }}
                        className="
                            p-2 rounded-full bg-red-100 text-red-600 
                            hover:bg-red-200 hover:text-red-700
                            transition-all duration-200 hover:scale-110
                            active:scale-95
                        "
                        title="Delete task"
                    >
                        <Trash size={14} />
                    </button>
                </div>


        </div>
    )
}

export default TaskCard