import { Route, Routes } from 'react-router-dom'
import Horror from './components/Horror'
import Classics from './components/Classics'
import Pulp from './components/Pulp'
import Philosophy from './components/Philosophy'
import Scifa from './components/Scifa'
import Nonfiction from './components/Nonfiction'
import Thriller from './components/Thriller'
import Homepage from './components/Homepage'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Signup from './components/Signup'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route index element={<Homepage />} />
          <Route path='classics' element={<Classics />} />
          <Route path='pulp' element={<Pulp />} />
          <Route path='scifa' element={<Scifa />} />
          <Route path='horror' element={<Horror />} />
          <Route path='philosophy' element={<Philosophy />} />
          <Route path='thriller' element={<Thriller />} />
          <Route path='nonfiction' element={<Nonfiction />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App
