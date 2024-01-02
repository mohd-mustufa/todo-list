import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "todos",
  initialState: { todoList: [], editTodo: false },
  reducers: {
    setTodoList: (state, action) => {
      state.todoList = action.payload;
    },
    addTodo: (state, action) => {
      state.todoList = [action.payload, ...state.todoList];
    },
    deleteTodo: (state, action) => {
      state.todoList = state.todoList.filter(
        (todo) => todo.id !== action.payload
      );
    },
    updateTodo: (state, action) => {
      const updatedTitle = action.payload;

      state.todoList = state.todoList.map((todo) => {
        if (todo.id === state.editTodo.id)
          return { ...todo, title: updatedTitle };
        else return todo;
      });
    },
    setEditTodo: (state, action) => {
      state.editTodo = action.payload;
    },
  },
});

export default todosSlice.reducer;
export const { setTodoList, addTodo, deleteTodo, updateTodo, setEditTodo } =
  todosSlice.actions;
