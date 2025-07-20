import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { TaskType } from "../../types/index";

const initialState: TaskType[]=[];

const taskSlice= createSlice({
    name:'tasks',
    initialState,
    reducers: {
        addTask:{
            reducer:(state,action:PayloadAction<TaskType>)=>{
                state.push(action.payload);
            },
            prepare:(task: Omit<TaskType, 'id'>)=>({
                payload:{
                    ...task,
                    id:nanoid(),
                }, 
            }),
        },
        editTask:(state,action: PayloadAction<TaskType>) => {
            const index= state.findIndex(t=> t.id===action.payload.id);
            if(index!== -1) state[index] =action.payload;
        },
        moveTask: (
            state,
            action: PayloadAction<{ taskId: string; columnId: string }>)=> {
            const task = state.find(t=> t.id === action.payload.taskId);
            if(task) task.columnId=action.payload.columnId;
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            const index = state.findIndex(t => t.id === action.payload);
            if (index !== -1) state.splice(index, 1);
        },
    },
});

export const {addTask ,editTask, moveTask, deleteTask}= taskSlice.actions;
export default taskSlice.reducer;