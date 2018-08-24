import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: 'Today\'s Todo',
      userId: 1,
      todo: '',
      todoArray: [],
      doneTodoArray: []
    }
  }

componentDidMount = () => {
  this.getTodos();
}

componentDidUpdate = (prevProps, prevState) => {
  var allDoneBtn = document.getElementById("btn-done-all");
  var allShowBtn = document.getElementById("btn-show-all");

  if (this.state.todoArray.length > 0 ) {
    allDoneBtn.classList.remove("hidden");
    allShowBtn.classList.remove("hidden");
  }
  else {
    allDoneBtn.classList.add("hidden");
    allShowBtn.classList.add("hidden");
  }
}

getTodos = () => {
  fetch('http://localhost:3310/todos?userId=1', )
   .then(response => response.json())
   .then(response => this.setState({ todoArray: response.data }))
   .catch(error => console.log(error));
}

addTodo = () => {
  fetch(`http://localhost:3310/todos/add?todoId=default&userId=${this.state.userId}&todoName=${this.state.todo}&isTodoDone=false&dateCreated=NOW()&dateTodoDone=NULL`)
   .then(response => response.json())
   .then(this.getTodos())
   .catch(error => console.log(error));
}

deleteTodo = (userId, todoName) => {
  fetch(`http://localhost:3310/todos/delete?userId=${userId}&todoName=${todoName}`)
   .then(response => response.json())
   .then(this.getTodos())
   .catch(error => console.log(error));
}

updateTodoDone = (userId, todoName) => {
  fetch(`http://localhost:3310/todos/updateDone?userId=${userId}&todoName=${todoName}`)
   .then(response => response.json())
   .then(this.getTodos())
   .catch(error => console.log(error));
}

updateTodosDone = (userId) => {
  fetch(`http://localhost:3310/todos/updateAllDone?userId=${userId}`)
   .then(response => response.json())
   .then(this.getTodos())
   .catch(error => console.log(error));
}

onFormSubmit = (event) => {
  event.preventDefault();
  const { todo } = this.state;
  const isEmpty = todo.length > 0;

  if(isEmpty){
    this.addTodo();

    this.setState({
      todo: ''
    });
  }
  else {
    var errorMsg = document.getElementById("error-msg");
    errorMsg.classList.remove("hidden");

    setTimeout(function () {
        document.getElementById('error-msg').classList.add("hidden");
    }, 3000);

    console.log(isEmpty);
  }
}

addNewTodo = (event) => {
  //console.log(event.target.value);
  this.setState({
    todo: event.target.value
  });
}

removeTodo = (index) => {
  const todos = [...this.state.todoArray];
  this.deleteTodo(todos[index].userId, todos[index].todoName);

  todos.splice(index, 1);
}

isTodoDone = (event, index) => {
  //console.log(event.target.checked);
  const todos = [...this.state.todoArray];
  todos[index] = {...todos[index]};
  todos[index].done = event.target.checked;

  this.updateTodoDone(todos[index].userId, todos[index].todoName)
}

markAllTodosDone = () => {
  this.updateTodosDone(this.state.userId);

  var allDoneBtn = document.getElementById("btn-done-all");
  allDoneBtn.classList.remove("hidden");
}

showDoneTodos = () => {
  fetch('http://localhost:3310/todos/done?userId=1', )
   .then(response => response.json())
   .then(response => this.setState({ todoArray: response.data }))
   .catch(error => console.log(error));
}

  render() {
    return (
      <div className="App">
        <h1 className="title">{ this.state.title }</h1>
        <TodoForm
            todo={ this.state.todo }
            onFormSubmit={ this.onFormSubmit.bind(this) }
            addNewTodo={ this.addNewTodo.bind(this) } />
            <button className="btn btn-success btn-all-done hidden" id="btn-done-all" onClick={ () => this.markAllTodosDone() }>All done</button>
            <button className="btn btn-info btn-all-todos hidden" id="btn-show-all" onClick={ () => this.showDoneTodos() }>All todos</button>
            <TodoList
                todoArray={ this.state.todoArray }
                isTodoDone={ this.isTodoDone.bind(this) }
                removeTodo={ this.removeTodo.bind(this) } />
      </div>
    );
  }
}

export default App;
