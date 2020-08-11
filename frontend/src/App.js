/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import Task from "./components/Task";
/* eslint-enable no-unused-vars */
import taskService from "./services/tasks";
import { useField } from "./hooks/useField";

function App() {
  const name = useField("text");
  const description = useField("text");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    const data = await taskService.getAll();
    setTasks(data);
  };

  const addTask = async (event) => {
    event.preventDefault();
    const newTask = {
      name: name.value,
      description: description.value,
      status: true,
    };
    const data = await taskService.create(newTask);
    setTasks(tasks.concat(data));
    name.reset();
    description.reset();
  };

  const deleteTask = async (task) => {
    console.log(task);
    taskService.remove(task);
    setTasks(tasks.filter((t) => t._id !== task._id));
  };

  const updateTask = async (task) => {
    console.log("update");
    task.status = false;
    const tasks = await taskService.update(task);
    setTasks(tasks);
  };

  return (
    <div className="App">
      <h1>My Todos</h1>
      <TaskForm name={name} desc={description} handleSubmit={addTask} />
      {tasks.map((task) => (
        <Task
          key={task._id}
          task={task}
          handleDelete={deleteTask}
          handleUpdate={updateTask}
        />
      ))}
    </div>
  );
}

export default App;
