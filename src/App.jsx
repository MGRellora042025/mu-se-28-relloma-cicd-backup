import { useState } from 'react'
import './App.css'
import DoctorList from './components/DoctorList'; 
import PatientList from './components/PatientList';
import Appointments from './components/Appointments';
import Calendar from './components/Calendar';

function App() {
  const [currentPage, setCurrentPage] = useState('doctor');
  const [appointments, setAppointments] = useState([]);

  const renderPage = () => {
    switch (currentPage) {
      case 'doctor':
        return <DoctorList />;
      case 'patient':
        return <PatientList />;
      case 'appointment':
        return <Appointments appointments={appointments} setAppointments={setAppointments} />;
      case 'calendar':
        return <Calendar appointments={appointments} />;
      default:
        return <DoctorList />;
    }
  };

  return (
    <>
      {/* Navigation Buttons */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        justifyContent: 'center', 
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #ddd'
      }}>
        <button 
          onClick={() => setCurrentPage('doctor')}
          style={{
            padding: '10px 20px',
            backgroundColor: currentPage === 'doctor' ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Doctors
        </button>
        <button 
          onClick={() => setCurrentPage('patient')}
          style={{
            padding: '10px 20px',
            backgroundColor: currentPage === 'patient' ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Patients
        </button>
        <button 
          onClick={() => setCurrentPage('appointment')}
          style={{
            padding: '10px 20px',
            backgroundColor: currentPage === 'appointment' ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Appointments
        </button>
        <button 
          onClick={() => setCurrentPage('calendar')}
          style={{
            padding: '10px 20px',
            backgroundColor: currentPage === 'calendar' ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Calendar
        </button>
      </div>

      {/* Page Content */}
      <div style={{ padding: '20px' }}>
        {renderPage()}
      </div>
    </>
  )
}

export default App
