import {
    FETCH_TODOS, CREATE_TODO, UPDATE_TODOS, STORE_TAGS,
} from "../../constants/todoActionType";

const initState = {
    todos: [],
    loading: false,
    error: null,
    tags: []
}

const todoReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_TODOS:
            return {
                ...state,
                todos: [...action.payload],
                loading: false,
                error: null,
            }
        case UPDATE_TODOS:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case STORE_TAGS:
            return {
                ...state,
                tags: [...action.payload],
                loading: true,
                error: null,
            }

        default:
            return state;
    }
}

export default todoReducer;
