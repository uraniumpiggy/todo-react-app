import "./ToDoItem.css"
import React from "react";
import { Done } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux"
import { toggleCompleted } from "../../store/toDoSlice";

export const ToDoItem = ({id}) => {
    const dispatch = useDispatch()
    const item = useSelector(state => state.todos.find(item => item.id === id))
    const toggle = toggleCompleted

    return (
        <div className="todo-item">
            <div className="icon" onClick={() => {
                dispatch(toggle(id))
            }}>{item.completed ? <Done style={{ color: 'green'}}/> : <></>}</div>
            <div 
                className={`text ${item.completed ? 'completed' : ''}`}
            >{item.text}</div>
        </div>
    )
}