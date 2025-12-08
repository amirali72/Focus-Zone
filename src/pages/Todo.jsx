import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";

const Todo = () => {
  const [todo, setTodo] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [filter, setFilter] = useState("all");
  const [editID, setEditID] = useState(null);
  const [editVal, setEditVal] = useState("");
  const [isFirstRender, setIsFirstRender] = useState(true); 

  const addTodo = () => {
    if (!inputVal) return;
    setTodo([...todo, { id: Date.now(), text: inputVal, completed: false }]);
    setInputVal("");
  };

  const deleteTodo = (id) => {
    const newList = todo.filter((todo) => todo.id !== id);
    setTodo(newList);
  };

  const completeTodo = (id) => {
    const newList = todo.map((todos) => {
      if (todos.id === id) {
        return { ...todos, completed: !todos.completed };
      } else {
        return todos;
      }
    });
    setTodo(newList);
    console.log(todo);
  };

  const saveEdit = (id) => {
    if (!editVal) return;
    const newList = todo.map((todos) => {
      if (todos.id === id) {
        return { ...todos, text: editVal };
      }
      return todos;
    });
    setTodo(newList);
    setEditVal("");
    setEditID(0);
  };

  let todosToShow = todo;

  if (filter === "active") {
    todosToShow = todo.filter((t) => t.completed === false);
  } else if (filter === "completed") {
    todosToShow = todo.filter((t) => t.completed === true);
  }

  useEffect(() => {
    const data = localStorage.getItem("todos");
    if (data) {
      const todoData = JSON.parse(data);
      setTodo(todoData);
    }
    setIsFirstRender(false); 
  }, []);

  useEffect(() => {
    if (!isFirstRender) { 
      localStorage.setItem("todos", JSON.stringify(todo));
    }
  }, [todo, isFirstRender]);

  const remainingTasks = todo.filter((t) => !t.completed).length;

  return (
    <div className="max-w-2xl mx-auto p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Todo</h1>
        <p className="text-gray-600 text-sm">
          Plan your focus blocks with a lightweight task list.
        </p>
      </div>

      {/* Input Section */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Add a task and press Enter..."
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
        />
        <button
          onClick={addTodo}
          className="px-6 py-2.5 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition"
        >
          Add
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-1.5 text-sm font-medium rounded-lg transition ${
            filter === "all"
              ? "bg-teal-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`px-4 py-1.5 text-sm font-medium rounded-lg transition ${
            filter === "active"
              ? "bg-teal-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-1.5 text-sm font-medium rounded-lg transition ${
            filter === "completed"
              ? "bg-teal-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Completed
        </button>
      </div>

      {/* Todo List */}
      <div className="space-y-2">
        {todosToShow.map((todos) => {
          return todos.id !== editID ? (
            <div
              key={todos.id}
              className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition group"
            >
              <input
                type="checkbox"
                checked={todos.completed}
                onChange={() => completeTodo(todos.id)}
                className="w-5 h-5 rounded border-gray-300 text-teal-600 focus:ring-2 focus:ring-teal-500 cursor-pointer"
              />
              <span
                className={`flex-1 text-gray-800 ${
                  todos.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {todos.text}
              </span>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => {
                    setEditID(todos.id);
                    setEditVal(todos.text);
                  }}
                  className="p-1.5 text-gray-500 hover:text-teal-600 hover:bg-teal-50 rounded transition"
                  title="Edit"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => deleteTodo(todos.id)}
                  className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div
              key={todos.id}
              className="flex items-center gap-3 p-3 bg-teal-50 border-2 border-teal-500 rounded-lg"
            >
              <input
                type="text"
                value={editVal}
                onChange={(e) => setEditVal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveEdit(todos.id)}
                className="flex-1 px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={() => saveEdit(todos.id)}
                  className="p-1.5 text-white bg-teal-600 hover:bg-teal-700 rounded transition"
                  title="Save"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={() => {
                    setEditID(null);
                    setEditVal("");
                  }}
                  className="p-1.5 text-gray-600 bg-gray-200 hover:bg-gray-300 rounded transition"
                  title="Cancel"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      {todo.length > 0 && (
        <div className="mt-6 text-sm text-gray-500">
          {remainingTasks} {remainingTasks === 1 ? "task" : "tasks"} remaining
        </div>
      )}

      {todo.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p>No tasks yet. Add one to get started!</p>
        </div>
      )}
    </div>
  );
};

export default Todo;