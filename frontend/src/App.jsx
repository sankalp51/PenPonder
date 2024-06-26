import { RouterProvider } from 'react-router-dom'
import router from './routes/Routes'
import { Toaster } from 'sonner'

export default function App() {

  return (
    <main>
      <RouterProvider router={router} />
      <Toaster />
    </main>
  )
}

