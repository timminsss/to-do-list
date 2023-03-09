import React, { useState} from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import './App.css';
import Input from './components/Input'
import List from './components/List'
import { Todo } from './model'

const App:React.FC = () => {

  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([])
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id:Date.now(), todo: todo, isDone: false}])
      setTodo("");
    }
  };

  const onDragEnd = (result:DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return
    };
    if (destination.droppableId===source.droppableId &&
      destination.index===source.index) {
      return
      };

    let add;
    let active = todos
    let complete= completedTodos;

    if (source.droppableId==='TodoList') {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1)
    }

    if (destination.droppableId==='TodoList') {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }
    console.log(complete)
    console.log(active)
    // setCompletedTodos(complete)
    // setTodos(active)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <h1 className="header">tasker</h1>
        <Input todo={todo}
                setTodo={setTodo}
                handleAdd={handleAdd}/>
        <List todos={todos}
              setTodos={setTodos}
              completedTodos={completedTodos}
              setCompletedTodos={setCompletedTodos}/>
      </div>
    </DragDropContext>
  );
}

export default App;
