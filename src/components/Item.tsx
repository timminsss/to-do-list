import React, { useState, useRef, useEffect } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { GrEdit } from 'react-icons/gr'
import { MdDeleteOutline, MdDone } from 'react-icons/md'
import { Todo } from '../model'
import './styles.css'

interface Props {
  index: number;
  todo: Todo,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const Item: React.FC<Props> = ({index, todo, todos, setTodos}) => {

  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo)

  const handleDone = (id:number) => {
    setTodos(todos.map((todo) =>
    todo.id === id ? {...todo, isDone:!todo.isDone}:todo)
    )

  };

  const handleDelete = (id:number) => {
    setTodos(todos.filter((todo) => todo.id !== id )
    )
  };

  const handleEdit = (e: React.FormEvent, id:number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id===id? {...todo, todo:editTodo}:todo))
    )
    setEdit(false)
  };

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit])

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>

      {
        (provided, snapshot) => (
          <form className={`todos__item ${snapshot.isDragging ? "drag" : ""}`}
                onSubmit={(e) => handleEdit(e,todo.id)}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}>
            { edit ? (
              <input className="todos__edit-box"
                      value={editTodo}
                      onChange={(e) => setEditTodo(e.target.value)}
                      ref={inputRef}
              />
            ) : (
              todo.isDone ? (
                <s className="todos__item-text">{todo.todo}</s>
              ) : (
                <span className="todos__item-text">{todo.todo}</span>
              )
            )}
            <span className="icons">
              <span onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit)
                }
              }}>
                <GrEdit className="icon"/>
              </span>
              <span onClick={() => handleDelete(todo.id)}>
                <MdDeleteOutline className="icon"/>
              </span>
              <span onClick={() => handleDone(todo.id)}>
                <MdDone className="icon"/>
              </span>
            </span>
          </form>
        )
      }
    </Draggable>
  )
}

export default Item
