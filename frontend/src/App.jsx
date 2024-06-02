import { RouterProvider } from 'react-router-dom'
import router from './routes/Routes'
import { Toaster } from 'sonner'
function App() {

  return (
    <main>
      <RouterProvider router={router} />
      <Toaster />
    </main>
  )
}

export default App
