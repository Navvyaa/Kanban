#  Collaborative Kanban Board

A modern, responsive, and real-time collaborative **Kanban Board** built with React + Redux Toolkit.  
This project demonstrates advanced UI patterns like **drag and drop**, **undo/redo**, **filtering**, and **simulated multi-user WebSocket updates**.


---

##  Features

 **Drag & Drop** – Move tasks across columns with fluid animations  
 **Undo / Redo** – Revert or reapply actions using buttons or keyboard shortcuts  
 **Task Modal** – Add or edit tasks with assignee and priority selectors  
 **Filter Panel** – Filter tasks by assignee or priority  
 **Mock WebSocket** – Simulates real-time updates from other users  
 **Toast Notifications** – Get instant feedback on updates and collaboration events  
 **Responsive Design** – Works across all screen sizes

---

## 📁 Project Structure
```
src/
├── components/
│   ├── KanbanBoard.tsx       # Main board layout and logic
│   ├── Column.tsx            # Represents a single column
│   ├── TaskCard.tsx          # UI for displaying an individual task
│   ├── TaskModal.tsx         # Modal for creating or editing a task
│   └── FilterPanel.tsx       # UI for filtering tasks by assignee or priority

├── features/
│   ├── tasks/taskSlice.ts         # Redux slice for task state
│   ├── filters/filterSlice.ts     # Redux slice for filtering
│   └── columns/columnSlice.ts     # Redux slice for managing columns

├── redux/
│   └── store.ts              # Configures the Redux store 

├── utils/
│   ├── localStorage.ts       # Save and load app state from localStorage
│   └── simulateWebSocket.ts  # Simulates real-time updates from other users

├── hooks/
│   └── useReduxHooks.ts      # Typed Redux hooks for useSelector/useDispatch

├── data/
│   └── users.ts              # Static list of user profiles for task assignee

```

##  Setup & Development

### 1. Clone the repo
```bash
git clone https://github.com/your-username/kanban-board.git
cd kanban-board
```

### 2. Install deependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```

