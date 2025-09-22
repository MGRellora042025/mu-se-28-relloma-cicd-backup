import { useState } from 'react'

function Calendar({ appointments = [] }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Get current month and year
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Day names
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Get first day of the month and number of days in month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  // Get appointments for a specific date
  const getAppointmentsForDate = (day) => {
    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return appointments.filter(appointment => appointment.date === dateString);
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(
        <div key={`empty-${i}`} className="calendar-day empty">
        </div>
      );
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayAppointments = getAppointmentsForDate(day);
      const isToday = new Date().toDateString() === new Date(currentYear, currentMonth, day).toDateString();
      
      days.push(
        <div 
          key={day} 
          className={`calendar-day ${isToday ? 'today' : ''}`}
          style={{
            border: '1px solid #ddd',
            minHeight: '80px',
            padding: '5px',
            backgroundColor: isToday ? '#e3f2fd' : 'white',
            position: 'relative'
          }}
        >
          <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
            {day}
          </div>
          {dayAppointments.map((appointment, index) => (
            <div 
              key={index}
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '2px 5px',
                marginBottom: '2px',
                borderRadius: '3px',
                fontSize: '10px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
              title={`${appointment.time} - Dr. ${appointment.doctor.name} with ${appointment.patientName}`}
            >
              {appointment.time} - {appointment.patientName}
            </div>
          ))}
        </div>
      );
    }

    return days;
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <h1>Appointment Calendar</h1>
      
      {/* Calendar Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        backgroundColor: 'white',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <button 
          onClick={goToPreviousMonth}
          style={{
            padding: '8px 16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Previous
        </button>
        
        <h2 style={{ margin: 0 }}>
          {monthNames[currentMonth]} {currentYear}
        </h2>
        
        <button 
          onClick={goToNextMonth}
          style={{
            padding: '8px 16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Next
        </button>
      </div>

      {/* Calendar Grid */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        {/* Day Headers */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          backgroundColor: '#f8f9fa'
        }}>
          {dayNames.map(day => (
            <div 
              key={day}
              style={{
                padding: '10px',
                fontWeight: 'bold',
                textAlign: 'center',
                borderRight: '1px solid #ddd'
              }}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '0'
        }}>
          {generateCalendarDays()}
        </div>
      </div>

      {/* Legend */}
      <div style={{
        marginTop: '20px',
        backgroundColor: 'white',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3>Legend:</h3>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{
              width: '20px',
              height: '15px',
              backgroundColor: '#007bff',
              borderRadius: '3px'
            }}></div>
            <span>Appointment</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{
              width: '20px',
              height: '15px',
              backgroundColor: '#e3f2fd',
              border: '1px solid #007bff',
              borderRadius: '3px'
            }}></div>
            <span>Today</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;