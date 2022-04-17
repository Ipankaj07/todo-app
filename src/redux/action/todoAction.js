import axios from 'axios';
import {
    FETCH_TODOS, CREATE_TODO, UPDATE_TODOS, STORE_TAGS,
} from '../../constants/todoActionType';

const getTodos = (data) => {
    return {
        type: FETCH_TODOS,
        payload: data
    }
}

const fetchTodos = (search, tags, page) => async (dispatch) => {
    try {
        const res = await axios({
            method: 'GET',
            url: 'https://todo-backend-db.herokuapp.com/todos',
            params: {
                search,
                tags,
                page
            }
        });
        // console.log(res.data.todos);
        dispatch(getTodos(res.data.todos));
    }
    catch (err) {
        console.log(err);
    }
}

const storeTags = (data) => {
    return {
        type: STORE_TAGS,
        payload: data
    }
}

const fetchTags = (page) => async (dispatch) => {
    try {
        const res = await axios({
            method: 'GET',
            url: 'https://todo-backend-db.herokuapp.com/todos',
            params: {
                page
            }
        });
        // console.log(res.data.tags);
        dispatch(storeTags(res.data.todos));
        dispatch(fetchTodos("", "", page));
    }
    catch (err) {
        console.log(err);
    }
}

const updateTodos = (id) => {
    return {
        type: UPDATE_TODOS,
        payload: id
    }
}

const toggleStatus = (id, tpage) => async (dispatch) => {
    try {

        const data = await axios({
            method: 'GET',
            url: 'https://todo-backend-db.herokuapp.com/todos?limit=100',
        });
        const todos = data.data.todos;

        // console.log("todos", todos);

        await axios({
            method: 'PATCH',
            url: `https://todo-backend-db.herokuapp.com/todos/${id}`,
            data: {
                isCompleted: !todos.find((todo) => todo._id === id).isCompleted,
            }
        });
        dispatch(updateTodos(id));
        dispatch(fetchTodos("", "", tpage));
    }
    catch (err) {
        console.log(err);
    }
}

const toggleSubTask = (id, subTaskID, tpage) => async (dispatch) => {
    try {
        const data = await axios({
            method: 'GET',
            url: 'https://todo-backend-db.herokuapp.com/todos?limit=100',
        });
        const todos = data.data.todos;


        await axios({
            method: 'PATCH',
            url: `https://todo-backend-db.herokuapp.com/todos/${id}/subtasks/${subTaskID}`,
            data: {
                isCompleted: !todos.find((todo) => todo._id === id).subTasks.find((subTask) => subTask._id === subTaskID).isCompleted,
            }
        });
        dispatch(updateTodos(id));
        dispatch(fetchTodos("", "", tpage));
    }
    catch (err) {
        console.log(err);
    }
}

const deleteTodo = (id, tpage) => async (dispatch) => {
    try {
        await axios({
            method: 'DELETE',
            url: `https://todo-backend-db.herokuapp.com/todos/${id}`,
        });
        // console.log("delete", res.data.todos);
        dispatch(updateTodos(id));
        dispatch(fetchTodos("", "", tpage));
    }
    catch (err) {
        console.log(err);
    }
}




export { fetchTodos, fetchTags, deleteTodo, toggleStatus, toggleSubTask };