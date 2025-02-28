import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from "react-icons/bs";
import Swal from "sweetalert2";

function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    axios
      .get("http://localhost:3001/get")
      .then((result) => {
        setTodos(result.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: "Error!",
          text: "Failed to fetch tasks.",
          icon: "error",
          confirmButtonColor: "#d33",
        });
        setLoading(false);
      });
  };

  const handleEdit = (id, done) => {
    axios
      .put(`http://localhost:3001/update/${id}`, { done: !done })
      .then(() => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, done: !done } : todo
          )
        );
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: "Error!",
          text: "Failed to update task.",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3001/delete/${id}`)
          .then(() => {
            setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
            Swal.fire("Deleted!", "Your task has been deleted.", "success");
          })
          .catch((err) => {
            console.error(err);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete task.",
              icon: "error",
              confirmButtonColor: "#d33",
            });
          });
      }
    });
  };

  return (
    <div className="home">
      <h2>Todo List</h2>
      <Create onTaskAdded={(newTask) => setTodos([...todos, newTask])} />
      {loading ? (
        <p>Loading tasks...</p>
      ) : todos.length === 0 ? (
        <div>
          <h2>No Record</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div className="task" key={todo._id}>
            <div className="checkbox" onClick={() => handleEdit(todo._id, todo.done)}>
              {todo.done ? (
                <BsFillCheckCircleFill className="icon" />
              ) : (
                <BsCircleFill className="icon" />
              )}
              <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
            </div>
            <div>
              <span>
                <BsFillTrashFill
                  className="icon"
                  onClick={() => handleDelete(todo._id)}
                />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
