import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';
import Todo from './components/Todo';


function App() {
//State
  const [inputText , setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);


useEffect(() => {
  getLocalTodos();
},[])
  //UseEffect
  useEffect(() => {
      filterHandler();
      if(todos.length !== 0)
      saveLocalTodos();
  }, [todos, status]);


  //Function
  const filterHandler = () => {
    switch(status) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true))
        break; 
        case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false))
        break;
        default:
          setFilteredTodos(todos);
          break;
    }
  }


  const saveLocalTodos = () => {
    if(todos.length !== 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    } else if (localStorage.getItem('todos') !== null){
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  };

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
  } else {
    let todoLocal = JSON.parse(localStorage.getItem("todos"))
    setTodos(todoLocal);
  }
  }



  return (
    <div className="App">
     <header>
      <h1>TJ's To-do List</h1>
    </header>
    <Form 
    inputText={inputText} 
    setInputText={setInputText} 
    todos={todos} 
    setTodos={setTodos}
    setStatus={setStatus} 
    />

    <TodoList 
    todos={todos} 
    setTodos={setTodos}
    filteredTodos={filteredTodos}/>
    </div>
  );
}

export default App;
