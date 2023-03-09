import React, { useRef } from 'react'
import './styles.css'
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const Input: React.FC<Props> = ({todo, setTodo, handleAdd}) => {

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div>
      <form className="input"
            onSubmit={(e) => {
              handleAdd(e)
              inputRef.current?.blur();
            }}>
        <input className="input__box"
                value={todo}
                ref={inputRef}
                onChange={
                  (e) => setTodo(e.target.value)
                }
                type="input"
                placeholder='Enter your task' />
        <button className="input__submit" type="submit">
          <BsFillArrowRightCircleFill/>
        </button>
      </form>
    </div>
  )
}

export default Input
