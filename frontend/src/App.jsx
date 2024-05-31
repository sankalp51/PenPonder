import { RouterProvider } from 'react-router-dom'
import router from './routes/Routes'
function App() {

  return (
    <main>
      <RouterProvider router={router} />
    </main>
  )
}

export default App
