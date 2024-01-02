import React, { useEffect, useMemo, useState } from "react";
import { API_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  setEditTodo,
  setTodoList,
  updateTodo,
} from "../redux/todosSlice";
import TodoList from "./TodoList";
import { v4 } from "uuid";
import useDebounce from "../hooks/useDebounce";

const Form = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todoList);
  const editTodo = useSelector((state) => state.todos.editTodo);
  const [inputText, setInputText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filteredTodos, setFilteredTodos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText && !editTodo) {
      const newTodo = {
        id: v4(),
        title: inputText,
      };
      dispatch(addTodo(newTodo));
    } else if (editTodo) {
      dispatch(updateTodo(inputText));
    }
    setInputText("");
    dispatch(setEditTodo(false));
  };

  const debouncedSearchText = useDebounce(searchText, 300);

  useMemo(() => {
    console.log("filtering");
    setFilteredTodos(
      todos.filter((todo) =>
        todo.title
          .toLowerCase()
          .includes(debouncedSearchText.toLocaleLowerCase())
      )
    );
  }, [debouncedSearchText, todos]);

  useEffect(() => {
    const fetchData = async () => {
      const apiData = await fetch(API_URL);
      const jsonData = await apiData.json();
      dispatch(setTodoList(jsonData));
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter a task..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button type="submit" className="form-btn">
            Add
          </button>
          <input
            type="search"
            placeholder="Search task"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </form>
      </div>
      <TodoList todos={filteredTodos} setInputText={setInputText} />
    </>
  );
};

export default Form;
