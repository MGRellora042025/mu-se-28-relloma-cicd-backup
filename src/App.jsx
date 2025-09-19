import './App.css'
import DoctorList from './components/DoctorList'; 
import PatientList from './components/PatientList';

function App() {
  return (
    <>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1, border: '1px solid black', padding: '70px' }}>
          <DoctorList />
        </div>
        <div style={{ flex: 1, border: '1px solid black', padding: '70px' }}>
          <PatientList />
        </div>
      </div>
    </>
  )
}

export default App
