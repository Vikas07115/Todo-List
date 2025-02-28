import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function Create() {
  const [task, setTask] = useState("");  

  const handleAdd = () => {
    if (!task.trim()) {  
      Swal.fire({
        title: "Oops!",
        text: "Please enter a task before adding!",
        icon: "warning",
        confirmButtonColor: "#ff758c",
        confirmButtonText: "OK",
      });
      return;
    }

    axios.post('http://localhost:3001/add', { task })
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Task added successfully!",
          icon: "success",
          confirmButtonColor: "#28a745",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.reload();
        });
      })
      .catch(err => console.error(err));
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
        <input 
          type='text' 
          placeholder='Enter Task' 
          className='w-full p-3 border-b-2 border-gray-300 outline-none focus:border-blue-500'
          value={task} // Controlled input
          onChange={(e) => setTask(e.target.value)} 
        />
        <button 
          type='button' 
          className='mt-4 w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 transition duration-300'
          onClick={handleAdd}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default Create;
