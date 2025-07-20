import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import type {ColumnType} from "../../types/index";

const initialState: ColumnType[]=[
    {id:'todo',title:'Todo'},
    {id:'in-progress',title:'In-Progress'},
    {id: 'done', title: 'Done'},
];

const columnSlice= createSlice({
    name: 'columns',
    initialState,
    reducers: {
        addColumn: (state, action: PayloadAction<ColumnType>)=>{
            state.push(action.payload);
        },
        editColumnTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
            const col= state.find(c=> c.id===action.payload.id);
            if(col){
                col.title=action.payload.title;
            }
        },
        deleteColumn: (state, action: PayloadAction<string>) => {
            return state.filter(c => c.id !== action.payload);
        },
    },


});

export const {addColumn, editColumnTitle, deleteColumn}= columnSlice.actions;
export default columnSlice.reducer;