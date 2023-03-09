import React from 'react'
import { Droppable } from 'react-beautiful-dnd';
import { Todo } from "../model";
import Item from "./Item";
import './styles.css'

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const List: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos
}) => {

  return (
    <div className="container">
      <Droppable droppableId='TodoList'>
        {(provided, snapshot) => (
          <div className={`todos ${snapshot.isDraggingOver ? "drag-active" : ""}`}
                ref={provided.innerRef}
                {...provided.droppableProps}>
            <span className="todos__heading">Todo Tasks</span>
            {todos.map((todo, index)=> (
              <Item todo={todo}
                    index={index}
                    key={todo.id}
                    todos={todos}
                    setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
          )}
      </Droppable>
      <Droppable droppableId='CompletedList'>
        {(provided, snapshot) => (
          <div className={`todos remove ${snapshot.isDraggingOver ? "drag-complete" : ""}`}
                ref={provided.innerRef}
                {...provided.droppableProps}>
            <span className="todos__heading">Completed Tasks</span>
            {completedTodos.map((todo, index)=> (
              <Item todo={todo}
                    index={index}
                    key={todo.id}
                    todos={completedTodos}
                    setTodos={setCompletedTodos}/>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default List
