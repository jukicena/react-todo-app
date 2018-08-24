import React from 'react';

const ListItem = (props) => {
  const { todo, index } = props; // destructuring
  return (
    <li id="todo-list">
      <input className="btn-checkbox" id="is-todo-done" onChange={ (event) => props.isTodoDone(event, index) } type="checkbox" checked={ todo.done }></input>
      <span className="todo-text">{ todo.todoName }</span>
      <button type="button" className="btn btn-default btn-lg btn-remove pull-right" onClick={ () => props.removeTodo(index) }>
        <span className="glyphicon glyphicon-trash gly-icon pull-right" aria-hidden="true"></span>
      </button>
    </li>
  );
};

export default ListItem;
// <button className="btn btn- btn-remove" onClick={ () => props.removeTodo(index) }>Remove</button>
