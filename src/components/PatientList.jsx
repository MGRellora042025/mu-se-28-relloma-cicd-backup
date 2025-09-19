import { useEffect, useState } from 'react'
import TableRow from './TableRow';

function PatientList() {
    const API_URL = "http://localhost:3000/patients";
    const [patients, setPatients] = useState([]);
    const [newPatientName, setNewPatientName] = useState('');

  useEffect(() => {
    getAllPatients();
  }, []);

  function getAllPatients() {
    fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      setPatients(data);
    })
    .catch(error => console.log(error))
  }

  function addNewPatient() {
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: newPatientName})
      })
      .then(() => getAllPatients())
  }

  function handleOnChange(event) {
    setNewPatientName(event.target.value);
  }

  function handleAddOnClick() {
    // setPatients([...patients, {id: patients.length + 1, name: newPatientName }]);
    addNewPatient();
  }

  function handleDeleteOnClick(id) {
    if (confirm("Are you sure you want to delete this patient?")) {
      const remainingPatients = patients.filter(doc => doc.id !== id);
      setPatients(remainingPatients);

      fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      })
      .then(() => getAllPatients())
      
    } else {
      console.log("Action canceled.");
    }
  }

  return (
    <>
        <div>
            <input type="text" placeholder='Patient name...' onChange={handleOnChange} />
            <button onClick={handleAddOnClick}>Create</button>
        </div>

        <table>
            <thead>
                <th>ID</th>
                <th>Name</th>
                <th></th>
            </thead>
            <tbody>
                {patients.map(patient => <TableRow id={patient.id} name={patient.name} onDelete={() => handleDeleteOnClick(patient.id)} /> )}
            </tbody>
        </table>
    </>
  )
}

export default PatientList;