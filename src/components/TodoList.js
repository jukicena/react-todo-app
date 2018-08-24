import React from 'react';
import ListItem from './ListItem';

const TodoList = (props) => {
  return (
    <ul>
      {
        props.todoArray.map((todo, index) => {
          return (
            <ListItem
              key={ index }
              index={ index }
              todo={ todo }
              isTodoDone={ props.isTodoDone }
              removeTodo={ props.removeTodo } />
          )
        })
      }
    </ul>
  );
};

export default TodoList;
