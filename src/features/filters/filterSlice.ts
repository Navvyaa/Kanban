import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
    assignee: string;
    priority: 'high' | 'medium' | 'low'|'' ;
}
const initialState: FilterState={
    assignee: "",
    priority: "",
};

const filterSlice= createSlice({
    name: 'filters',
    initialState,
    reducers:{
        setAssignee:(state, action)=>{
            state.assignee=action.payload;
        },
        setPriority:(state,action:PayloadAction<'high' | 'medium' | 'low' | ''>)=>{
            state.priority=action.payload;
        },
        clearFilters:()=>initialState,
    },
});

export const {setAssignee, setPriority,clearFilters}=filterSlice.actions;
export default filterSlice.reducer;