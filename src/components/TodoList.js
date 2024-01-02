import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setEditTodo } from "../redux/todosSlice";

const TodoList = ({ todos, setInputText }) => {
  const dispatch = useDispatch();

  const handleUpdate = (todo) => {
    setInputText(todo.title);
    dispatch(setEditTodo(todo));
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <li>{todo.title}</li>
          <button onClick={() => handleUpdate(todo)} className="form-btn btn">
            Edit
          </button>
          <button
            onClick={() => handleDelete(todo.id)}
            className="form-btn btn"
          >
            Del
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
