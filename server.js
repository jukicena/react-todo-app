const express = require('express');
const cors = require('cors');
var mysql = require('mysql')
const port = 3310;

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'todo_sql'
})

app.use(cors());

app.get('/', (req, res) => {
  res.send('type: /todos ');
});

app.get('/users', (req, res) => {
  const { userId } = req.query;
  var query = `SELECT * FROM users`;
  connection.query(query, (error, results) => {
    if(error) {
      return res.send(error);
    }
    else {
      return res.json({
        data: results
      });
    }
  });
});

// http://localhost:3310/todos?userId=3
app.get('/todos', (req, res) => {
  const { userId } = req.query;
  var query = `SELECT * FROM todos WHERE isTodoDone='false' AND userId=${userId}`;
  connection.query(query, (error, result) => {
    if(error) {
      return res.send(error);
    }
    else {
      return res.json({
        data: result
      });
    }
  });
});

app.get('/todos/done', (req, res) => {
  const { userId } = req.query;
  var query = `SELECT * FROM todos WHERE isTodoDone='true' AND userId=${userId}`;
  connection.query(query, (error, result) => {
    if(error) {
      return res.send(error);
    }
    else {
      return res.json({
        data: result
      });
    }
  });
});

// http://localhost:3310/users/add?email=ena@email.e&password=testPass3&username=Lenci
app.put('/users/add', (req, res) => {
  const { userId, email, password, username } = req.query;
  const query = `INSERT INTO users VALUES (default, '${email}', '${password}', '${username}')`;
  connection.query(query, (error, result) => {
    if(error) {
      return res.send(error);
    }
    else {
      return res.send('user is added successfully!');
    }
  });
});

// http://localhost:3310/todos/add?userId=1&todoName=testTodo1&isTodoDone=false&dateCreated=NOW()&dateTodoDone=NULL
app.put('/todos/add', (req, res) => {
  const { userId, todoId, todoName, isTodoDone, dateCreated, dateTodoDone } = req.query;
  var query = `INSERT INTO todos(todoId, userId, todoName, isTodoDone, dateCreated, dateTodoDone)
               VALUES(default, ${userId},'${todoName}', '${isTodoDone}', NOW(), NULL)`;
  connection.query(query, (error, result) => {
    if(error){
      return res.send(error);
    }
    else {
      return res.send('todo is added successfully!');
    }
  });
});

app.delete('/todos/delete', (req, res) => {
  const { userId, todoName } = req.query;
  var query = `DELETE FROM todos WHERE userId=${userId} AND todoName='${todoName}'`;
  connection.query(query, (error, result) => {
    if(error){
      return res.send(error);
    }
    else {
      return res.send('todo is deleted successfully!');
    }
  });
});

app.post('/todos/updateDone', (req, res) => {
  const { userId, todoName } = req.query;
  var query = `UPDATE todos SET isTodoDone='true', dateTodoDone=NOW() WHERE userId=${userId} AND todoName='${todoName}'`;
  connection.query(query, (error, result) => {
    if(error){
      return res.send(error);
    }
    else {
      return res.send('todo state done is successfully updated!');
    }
  });
});

app.post('/todos/updateAllDone', (req, res) => {
  const { userId } = req.query;
  var query = `UPDATE todos SET isTodoDone='true', dateTodoDone=NOW() WHERE userId=${userId}`;
  connection.query(query, (error, result) => {
    if(error){
      return res.send(error);
    }
    else {
      return res.send('todos state done is successfully updated!');
    }
  });
});

app.listen(port, () => {
  console.log('Listening on port ' + port);
});
