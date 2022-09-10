import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk(
    'todo/fetchTodos',
    async function (_, {rejectWithValue}) {
        try {
            const response = await fetch(
                'https://jsonplaceholder.typicode.com/todos?_limit=10'
            );
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error(`${(response.status, response.statusText)}`);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const addTodoThunk = createAsyncThunk(
    'todo/addTodoThunk',
    async function (title, {rejectWithValue, dispatch}) {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos',
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    },
                    body: JSON.stringify({
                        title,
                        body: '1',
                        userId: 1
                    })
                });
            if (!response.ok) throw new Error([response.status, response.statusText].join(": "));

            const todo = await response.json();
            console.log(todo)
            dispatch(addTodo(todo));

        } catch (error) {
            return rejectWithValue(error.message);
        }
    })
export const removeTodoThunk = createAsyncThunk(
    'todo/removeTodoThunk',
    async function (id, {rejectWithValue, dispatch}) {
        try {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/todos/${id}`,
                {
                    method: 'DELETE',
                }
            );
            if (response.ok) {
                dispatch(removeTodo({id}));
                return await response.json();
            } else {
                throw new Error(`${(response.status, response.statusText)}`);
            }
        } catch (error) {
            return rejectWithValue({error: error.message, id});
        }
    }
);
export const toggleStatusThunk = createAsyncThunk(
    'todo/toggleStatusThunk',
    async function (id, {rejectWithValue, getState}) {
        const todo = getState().todo.todos.find(todo => todo.id === id);
        try {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/todos/${id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({completed: todo.completed}),
                }
            );
            if (!response.ok) throw new Error([response.status, response.statusText].join(': '));

            return id;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: [],
        nextId: 1,
        status: 'ok',
        error: null,
        addStatus: 'ok',
        addError: null,
        removingStatus: 'ok',
        removingError: [],
        toggleStatus: 'ok',
        toggleError: null,
    },
    reducers: {
        addTodo(state, action) {
            state.todos.push(action.payload);
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
        },
    },
    extraReducers: {
        [fetchTodos.pending]: state => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchTodos.fulfilled]: (state, action) => {
            state.status = 'ok';
            state.error = null;
            state.todos = action.payload;
        },
        [fetchTodos.rejected]: (state, action) => {
            state.status = 'error';
            state.error = action.payload;
        },

        [addTodoThunk.pending]: (state) => {
            state.addStatus = 'loading';
            state.addError = null;
        },
        [addTodoThunk.fulfilled]: (state) => {
            state.addStatus = 'ok';
            state.addError = null;
        },
        [addTodoThunk.rejected]: (state, action) => {
            state.addStatus = 'error';
            state.addError = action.payload;
        },

        [removeTodoThunk.rejected]: (state, action) => {
            state.removingStatus = 'error';
            state.removingError.push({
                id: action.payload.id,
                error: action.payload.error,
            });
        },

        [toggleStatusThunk.fulfilled]: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload);
            todo.completed = !todo.completed;
            state.toggleStatus = 'ok';
            state.toggleError = null;
        },
        [toggleStatusThunk.rejected]: (state, action) => {
            state.toggleStatus = 'error';
            state.toggleError = action.payload;
        },

    },
});

export const {addTodo, removeTodo} = todoSlice.actions;

export default todoSlice.reducer;
