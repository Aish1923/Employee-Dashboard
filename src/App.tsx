import './App.css'
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddEmployee from './pages/AddEmployee'
import { EmployeeProvider } from './context/EmployeeContext';

function App() {

  return (
    <>
      <EmployeeProvider>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/add-employee' element={<AddEmployee />} />
        </Routes>
      </EmployeeProvider>
    </>
  )
}

export default App
