import { render } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Provider } from "react-redux";
import store from "../../store/store";
import { ToDoList } from "./ToDoList";

describe('ToDoList test', () => {
    test('renders todo list', () => {
        const {container} = render(
            <Provider store={store}>
                <ToDoList todos={[]}/>
            </Provider>
        )
        const wrapper = container.querySelector('.list')
        expect(wrapper).toBeInTheDocument()
    })
});
