import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TodoForm = (props) => {
  return (
    <form className="form-inline main-form" onSubmit={ props.onFormSubmit }>
      <p className="text-danger hidden" id="error-msg">Please enter something to do before adding new todo!</p>
      <input className="form-control add-input" type="text" onChange={ props.addNewTodo } id="newTodo" name="newTodo" value={ props.todo } placeholder="Create new todo" />
      <button className="btn btn-primary btn-add" type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;
