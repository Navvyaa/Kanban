
import { Toaster } from 'react-hot-toast';
import KanbanBoard from './components/KanbanBoard'
function App() {

  return (
    <>
    <Toaster position='top-right' reverseOrder={false} />
    <KanbanBoard />
    
    </>
  )
}

export default App
