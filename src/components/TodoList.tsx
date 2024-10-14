import React,{ useEffect,useState } from "react";
import { Todo } from "../types/Todo";

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>(() => {
      const savedTodos = sessionStorage.getItem('todos');
      return savedTodos ? JSON.parse(savedTodos) : [];
    });
    const [todoText, setTodoText] = useState<string>('');
  
    useEffect(() => {
      sessionStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);
  
    const addTodo = () => {
      if (todoText.trim() !== '') {
        setTodos([...todos, { id: Date.now(), text: todoText, completed: false }]);
        setTodoText('');
      }
    };
  
    const toggleTodo = (id: number) => {
      setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
    };
      return (
        <div>
          <h1>Todo List</h1>
          <input
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            placeholder="Add a new todo"
          />
          <button onClick={addTodo}>Add</button>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id} onClick={() => toggleTodo(todo.id)} style={{ textDecoration: todo.completed ? 'line-through' : undefined }}>
                {todo.text}
              </li>
            ))}
          </ul>
        </div>
      );
    };

    export default TodoList;