import { useEffect, useState } from 'react'
import TableRow from './TableRow';

function DoctorList() {
  const API_URL = 'http://localhost:3000/doctors';
  const [doctor, setDoctor] = useState([]);
  const [newDoctorName, setNewDoctorName] = useState('');
  const [newDoctorSpecialty, setNewDoctorSpecialty] = useState('');

  useEffect(() => {
    getAllDoctors()
  }, []);

  function getAllDoctors() {
    fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      setDoctor(data);
    })
    .catch(error => console.log(error))
  }

  function addNewDoctor() {
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: newDoctorName, specialty: newDoctorSpecialty})
      })
      .then(() => getAllDoctors())
  }

  function handleDoctorNameOnChange(event) {
    setNewDoctorName(event.target.value);
  }

  function handleDoctorSpecialtyOnChange(event) {
    setNewDoctorSpecialty(event.target.value);
  }

  function handleOnClick() {
    // setDoctor([...doctor, {id: doctor.length + 1, name: newDoctorName }]);
    addNewDoctor();
  }

  function handleDeleteOnClick(id) {
    if (confirm("Are you sure you want to delete this doctor?")) {
      // const remainingDoctors = doctor.filter(doc => doc.id !== id);
      // setDoctor(remainingDoctors);
      fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      })
      .then(() => getAllDoctors())
    } else {
      console.log("Action canceled.");
    }
  }

  return (
    <>
      <div>
        <input type="text" placeholder='Doctor name...' onChange={handleDoctorNameOnChange} />
        <input type="text" placeholder='Doctor specialty...' onChange={handleDoctorSpecialtyOnChange} />
        <button onClick={handleOnClick}>Create</button>
      </div>

      <table>
        <thead>
          <th>ID</th>
          <th>Name</th>
          <th></th>
        </thead>
        <tbody>
          {doctor.map(doc => <TableRow id={doc.id} name={doc.name} onDelete={() => handleDeleteOnClick(doc.id)} /> )}
        </tbody>
      </table>
    </>
  )
}

export default DoctorList;