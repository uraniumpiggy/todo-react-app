import { createSlice, nanoid } from "@reduxjs/toolkit";

// {id, text, completed}
const initialState = {
    todos: []
}

const toDoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addToDo(state, {payload}) {
            const item = {
                id: nanoid(),
                text: payload,
                completed: false
            }
            state.todos.unshift(item)
        },
        toggleCompleted(state, {payload}) {
            const index = state.todos.findIndex(item => item.id === payload)
            state.todos[index].completed = !state.todos[index].completed
        },
        clearCompleted(state) {
            state.todos = state.todos.filter(item => !item.completed)
        }
    }
})

export const {addToDo, toggleCompleted, clearCompleted} = toDoSlice.actions
export default toDoSlice.reducer