import './App.css';
import { ToDoList } from './components/ToDoList/ToDoList';
import React, { useRef, useState } from 'react';
import { addToDo, clearCompleted } from './store/toDoSlice';
import { useDispatch, useSelector } from "react-redux"
import { KeyboardArrowDown } from "@material-ui/icons";

function App() {
  const allTodos = useSelector(state => state.todos)
  const completedTodos = allTodos.filter(item => item.completed === true)
  const activeTodos = allTodos.filter(item => item.completed === false)
  const inputRef = useRef(null)
  const dispatch = useDispatch()
  const [activeList, setActiveList] = useState(0)
  const add = addToDo
  const clear = clearCompleted

  const handleSubmit = event => {
      if (event.key === 'Enter') {
          dispatch(add(inputRef.current.value))
          inputRef.current.value = ''
      }
  }

  let content
  if (activeList === 0) {
    content = allTodos
  } else if (activeList === 1) {
    content = activeTodos
  } else {
    content = completedTodos
  }

  return (
    <div className='app'>
      <header>Todos</header>
      <div className='wrapper'>
        <div className='input-wrapper'>
            <KeyboardArrowDown/>
            <input 
              type="text" 
              ref={inputRef} 
              onKeyDown={handleSubmit}
              placeholder="What needs to be done?"
            />
        </div>
        <div className='lists-wrapper'>
          <ToDoList todos={content}/>
        </div>
        <div className='action-section'>
          <div className='items-left'>{`${activeTodos.length} items left`}</div>
          <div className='buttons'>
            <button 
              onClick={() => {setActiveList(0)}} 
              className={ activeList === 0 ? 'button-active' : '' }>All</button>
            <button 
              onClick={() => {setActiveList(1)}} 
              className={ activeList === 1 ? 'button-active' : '' }>Active</button>
            <button 
              onClick={() => {setActiveList(2)}} 
              className={ activeList === 2 ? 'button-active' : '' }>Completed</button>
          </div>
          <div className='clear-completed'>
            <button onClick={() => {dispatch(clear())}}>Clear completed</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
