import { ToDoItem } from "../ToDoItem/ToDoItem"
import "./ToDoList.css"

export const ToDoList = ({todos}) => {
    return (
        <div className="list">
            {todos.map((item, index) => <ToDoItem id={item.id} key={index}/>)}
        </div>
    )
}