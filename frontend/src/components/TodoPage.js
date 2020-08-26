import React, { useState, useEffect } from "react";
import taskService from "../services/tasks";
/* eslint-disable no-unused-vars */
import TaskForm from "./TaskForm";
import Task from "./Task";
import { Container, Button } from "react-bootstrap";

/* eslint-enable no-unused-vars */

const TodoPage = ({ handleLogout }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    const data = await taskService.getTasks();
    setTasks(data);
  };

  const createTask = async (newTask) => {
    const data = await taskService.create(newTask);
    setTasks(tasks.concat(data));
  };

  const deleteTask = async (task) => {
    taskService.remove(task);
    setTasks(tasks.filter((t) => t._id !== task._id));
  };

  const updateTask = async (task) => {
    task.status = false;
    const tasks = await taskService.update(task);
    setTasks(tasks);
  };

  return (
    <Container className="App">
      <Button onClick={handleLogout} className="Logout">
        Logout
      </Button>
      <h1>My Todos</h1>
      <TaskForm createTask={createTask} />
      {tasks.map((task) => (
        <Task
          key={task._id}
          task={task}
          handleDelete={deleteTask}
          handleUpdate={updateTask}
        />
      ))}
    </Container>
  );
};

export default TodoPage;
