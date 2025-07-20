import {configureStore} from "@reduxjs/toolkit";
import columnReducer from "../features/columns/coulmnSice"; 
import taskReducer from "../features/tasks/taskSlice";
import filterReducer from "../features/filters/filterSlice";
import { saveToLocalStorage,loadfromLocalstorage } from "../utils/localStorage";

const LOCAL_STORAGE_KEY = "kanban-state";

const persistedState = loadfromLocalstorage<{
    tasks:ReturnType<typeof taskReducer>;
    columns:ReturnType<typeof columnReducer>;
    filters:ReturnType<typeof filterReducer>;
}>(LOCAL_STORAGE_KEY);

export const store = configureStore({
    reducer:{
        tasks:taskReducer,
        columns:columnReducer,
        filters:filterReducer
    },
    preloadedState:persistedState,
});

store.subscribe(()=>{
    const state= store.getState();
    saveToLocalStorage(LOCAL_STORAGE_KEY,{
        tasks: state.tasks,
        columns: state.columns,
        filters: state.filters,
    });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;