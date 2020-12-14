import React from "react";
import { useField } from "../hooks/useField";
/* eslint-disable no-unused-vars */
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
/* eslint-enable no-unused-vars */

const TaskForm = ({ createTask }) => {
  const name = useField("text");
  const description = useField("text");
  // eslint-disable-next-line no-unused-vars
  const removeReset = ({ reset, ...rest }) => rest;
  const checkForm =
    name.value === "" ? true : description.value === "" ? true : false;

  const addTask = async (event) => {
    event.preventDefault();
    createTask({
      name: name.value,
      description: description.value,
      status: true,
    });
    name.reset();
    description.reset();
  };

  return (
    <form className="Form" onSubmit={addTask}>
      <div>
        <FormGroup data-cy="name" size="large">
          <FormLabel>Name</FormLabel>
          <FormControl variant="" autoFocus {...removeReset(name)} />
        </FormGroup>

        <FormGroup data-cy="description" size="large">
          <FormLabel>Description</FormLabel>
          <FormControl {...removeReset(description)} />
        </FormGroup>
      </div>
      <Button  data-cy="addTask" variant="" type="submit" disabled={checkForm}>
        Add task
      </Button>
    </form>
  );
};

export default TaskForm;
