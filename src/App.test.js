import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Provider } from "react-redux";
import store from './store/store';
import App from "./App";
import { addToDo } from "./store/toDoSlice";
import { act } from "react-dom/test-utils";

describe('App component test', () => {
    it('should renders input', () => {
        render(
            <Provider store={store}>
                <App/>
            </Provider>
        )
        const input = screen.getByPlaceholderText(/what needs to be done/i) 
        expect(input).toBeInTheDocument()
    }),
    it('should renders buttons', () => {
        const { container } = render(
            <Provider store={store}>
                <App/>
            </Provider>
        )
        const buttons = container.querySelectorAll('button')
        expect(buttons.length).toEqual(4)
    }),
    it('should create todo', () => {
        render(
            <Provider store={store}>
                <App/>
            </Provider>
        )
        const input = screen.getByPlaceholderText(/what needs to be done/i)
        fireEvent.input(input, {
            target: {value: 'make todos'}
        })
        fireEvent.keyDown(input, {key: 'Enter', code: 'Enter', charCode: 13})
        expect(store.getState().todos.length).toEqual(1)
    }),
    it('should toggle completed', () => {
        const {container} = render(
            <Provider store={store}>
                <App/>
            </Provider>
        )
        const todoIcon = container.querySelector('.icon')
        fireEvent.click(todoIcon)
        expect(store.getState().todos[0].completed).toEqual(true)
    }) 
    it('should clear todos', () => {
        render(
            <Provider store={store}>
                <App/>
            </Provider>
        )
        const clearButton = screen.getByText(/clear completed/i)
        fireEvent.click(clearButton)
        expect(store.getState().todos.length).toEqual(0)
    }),
    it('should toggle showed todos', () => {
        const {container} = render(
            <Provider store={store}>
                <App/>
            </Provider>
        )
        act(() => {
            store.dispatch(addToDo('todo1'))
            store.dispatch(addToDo('todo2'))
        })
        const activeButton = screen.getByText(/active/i)
        fireEvent.click(activeButton)
        expect(container.querySelectorAll('.todo-item').length).toEqual(2)
        const completedbutton = screen.getByText(/^completed$/i)
        fireEvent.click(completedbutton)
        expect(container.querySelectorAll('.todo-item').length).toEqual(0)
    })
});
