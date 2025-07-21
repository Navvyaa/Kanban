import { useAppDispatch, useAppSelector } from "../hooks/useReduxHooks";
import { setAssignee, setPriority, clearFilters } from "../features/filters/filterSlice";
import type { RootState } from "../redux/store"; // Adjust the path to where your store's RootState is exported
import { users } from "../data/users";
import { Filter, X } from 'lucide-react'


const FilterPanel: React.FC = () => {
    const dispatch = useAppDispatch();
    const { priority, assignee } = useAppSelector((state: RootState) => state.filters);
    const hasActiveFilter = priority || assignee;

    return (
        <div className="flex items-center flex-row lg:gap-4 mr-0 ml-2 my-1 gap-2 text-white/70 mb-3 flex-wrap">
            <div className="flex items-center gap-3 lg:gap-1 ">
                <Filter size={20} className="text-blue-400 hidden sm:inline" />
                <span className="font-semibold text-lg text-white ">Filters: </span>
            </div>
            <div className="relative">
                <select className="appearance-none p-2 bg-neutral-800 border border-neutral-900 px-2.5 sm:pr-8 pr-6 rounded-lg hover:border-neutral-700" value={priority} onChange={(e) => dispatch(setPriority(e.target.value as "" | "low" | "medium" | "high"))} >
                    <option value="">All</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
            <div className="relative">
                <select
                    className="appearance-none py-2 pl-4 pr-8 text-left bg-neutral-800 border border-neutral-900  rounded-lg hover:border-neutral-700"
                    value={assignee}
                    onChange={(e) => dispatch(setAssignee(e.target.value))}
                >
                    <option value="">All Assignee</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>


            {hasActiveFilter && (
                <button
                    onClick={() => dispatch(clearFilters())}
                    className="
                            flex items-center gap-2 p-2 text-sm font-medium
                            bg-red-500/20 text-red-400 border border-red-600/30 rounded-lg
                            hover:bg-red-600/30 hover:border-red-500/50
                            transition-all duration-200
                        "
                >
                    <X size={20} />
                   <span className="hidden sm:inline">Clear Filters</span>
                </button>
            )}

        </div>


    )
}

export default FilterPanel;