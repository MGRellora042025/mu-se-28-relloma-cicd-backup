import { useEffect, useState } from 'react'

function Appointments({ appointments = [], setAppointments }) {
  const API_URL = 'http://localhost:3000/doctors';
  
  // State for form data
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [patientName, setPatientName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  
  // State for data
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    getAllDoctors();
  }, []);

  function getAllDoctors() {
    fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      setDoctors(data);
    })
    .catch(error => console.log(error))
  }

  // Time options for dropdown
  const timeOptions = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  function handleDoctorChange(event) {
    setSelectedDoctor(event.target.value);
  }

  function handlePatientNameChange(event) {
    setPatientName(event.target.value);
  }

  function handleDateChange(event) {
    setAppointmentDate(event.target.value);
  }

  function handleTimeChange(event) {
    setAppointmentTime(event.target.value);
  }

  function handleBookAppointment() {
    if (!selectedDoctor || !patientName || !appointmentDate || !appointmentTime) {
      alert('Please fill in all fields');
      return;
    }

    const selectedDoc = doctors.find(doc => doc.name === selectedDoctor);

    if (!selectedDoc) {
      alert('Selected doctor not found. Please select a valid doctor.');
      return;
    }

    console.log('Doctor:', selectedDoc);

    const newAppointment = {
      id: appointments.length + 1,
      doctor: selectedDoc,
      patientName,
      date: appointmentDate,
      time: appointmentTime,
      bookedAt: new Date().toISOString()
    };

    setAppointments([...appointments, newAppointment]);
    
    // Reset form
    setSelectedDoctor('');
    setPatientName('');
    setAppointmentDate('');
    setAppointmentTime('');
  }

  // Filter and sort appointments
  function getFilteredAndSortedAppointments() {
    let filteredAppointments = appointments;

    // Filter by selected doctor if one is selected
    if (selectedDoctor) {
      filteredAppointments = appointments.filter(appointment => 
        appointment.doctor.name === selectedDoctor
      );
    }

    // Sort by date, then time, then patient name
    return filteredAppointments.sort((a, b) => {
      // First sort by date
      const dateComparison = new Date(a.date) - new Date(b.date);
      if (dateComparison !== 0) return dateComparison;

      // If dates are equal, sort by time
      const timeComparison = a.time.localeCompare(b.time);
      if (timeComparison !== 0) return timeComparison;

      // If dates and times are equal, sort by patient name
      return a.patientName.localeCompare(b.patientName);
    });
  }

  return (
    <>
      <h1>Doctor-Patient React Application</h1>
      
      {/* Booking Form */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        margin: '20px auto',
        maxWidth: '600px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2>Book an Appointment</h2>
        
        {/* Doctor Dropdown */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="doctor-select">Select Doctor:</label>
          <select 
            id="doctor-select"
            value={selectedDoctor} 
            onChange={handleDoctorChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          >
            <option value="">Choose a doctor...</option>
            {doctors.map(doctor => (
              <option key={doctor.id} value={doctor.name}>
                Dr. {doctor.name} - {doctor.specialty}
              </option>
            ))}
          </select>
        </div>

        {/* Patient Name */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="patient-name">Patient Name:</label>
          <input
            id="patient-name"
            type="text"
            value={patientName}
            onChange={handlePatientNameChange}
            placeholder="Enter patient name..."
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        {/* Date */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="appointment-date">Date:</label>
          <input
            id="appointment-date"
            type="date"
            value={appointmentDate}
            onChange={handleDateChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        {/* Time */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="appointment-time">Time:</label>
          <select
            id="appointment-time"
            value={appointmentTime}
            onChange={handleTimeChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          >
            <option value="">Select time...</option>
            {timeOptions.map(time => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        {/* Book Button */}
        <button 
          onClick={handleBookAppointment}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Book Appointment
        </button>
      </div>

      {/* Appointments List */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        margin: '20px auto',
        maxWidth: '800px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2>Scheduled Appointments {selectedDoctor && `for Dr. ${selectedDoctor}`}</h2>
        
        {selectedDoctor && (
          <p style={{ color: '#666', marginBottom: '15px' }}>
            Showing appointments for Dr. {selectedDoctor}, sorted by date, time, and patient name.
          </p>
        )}
        
        {getFilteredAndSortedAppointments().length === 0 ? (
          <p>
            {selectedDoctor 
              ? `No appointments found for Dr. ${selectedDoctor}.` 
              : 'No appointments booked yet.'}
          </p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>ID</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Doctor</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Patient</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Date</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Time</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Specialty</th>
              </tr>
            </thead>
            <tbody>
              {getFilteredAndSortedAppointments().map(appointment => (
                <tr key={appointment.id}>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{appointment.id}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>Dr. {appointment.doctor.name}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{appointment.patientName}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{appointment.date}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{appointment.time}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{appointment.doctor.specialty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

export default Appointments;