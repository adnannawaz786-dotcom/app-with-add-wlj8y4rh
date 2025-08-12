import { useState } from 'react'
import { Trash2, Plus, Check, X } from 'lucide-react'
import { cn } from '../lib/utils'

export default function TodoList() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: newTodo.trim(),
          completed: false,
          createdAt: new Date()
        }
      ])
      setNewTodo('')
      setIsAdding(false)
    }
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo()
    } else if (e.key === 'Escape') {
      setNewTodo('')
      setIsAdding(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2 text-center">
          Todo List
        </h1>
        <p className="text-white/70 text-center">
          Stay organized with your daily tasks
        </p>
      </div>

      {/* Add Todo Section */}
      <div className="mb-6">
        {!isAdding ? (
          <button
            onClick={() => setIsAdding(true)}
            className={cn(
              "w-full p-4 rounded-2xl",
              "bg-white/10 backdrop-blur-md border border-white/20",
              "hover:bg-white/20 transition-all duration-300",
              "flex items-center justify-center gap-3",
              "text-white font-medium"
            )}
          >
            <Plus className="w-5 h-5" />
            Add New Task
          </button>
        ) : (
          <div className={cn(
            "p-4 rounded-2xl",
            "bg-white/10 backdrop-blur-md border border-white/20",
            "flex items-center gap-3"
          )}>
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter your task..."
              className={cn(
                "flex-1 bg-transparent text-white placeholder-white/50",
                "border-none outline-none text-lg"
              )}
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={addTodo}
                disabled={!newTodo.trim()}
                className={cn(
                  "p-2 rounded-full transition-all duration-200",
                  "bg-green-500/20 hover:bg-green-500/30 text-green-400",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                <Check className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  setNewTodo('')
                  setIsAdding(false)
                }}
                className={cn(
                  "p-2 rounded-full transition-all duration-200",
                  "bg-red-500/20 hover:bg-red-500/30 text-red-400"
                )}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Todo List */}
      <div className="space-y-3">
        {todos.length === 0 ? (
          <div className={cn(
            "p-8 rounded-2xl text-center",
            "bg-white/5 backdrop-blur-md border border-white/10"
          )}>
            <p className="text-white/50 text-lg">
              No tasks yet. Add one to get started!
            </p>
          </div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className={cn(
                "p-4 rounded-2xl transition-all duration-300",
                "bg-white/10 backdrop-blur-md border border-white/20",
                "hover:bg-white/15 hover:border-white/30",
                "group flex items-center gap-4"
              )}
            >
              {/* Checkbox */}
              <button
                onClick={() => toggleTodo(todo.id)}
                className={cn(
                  "w-6 h-6 rounded-full border-2 transition-all duration-200",
                  "flex items-center justify-center",
                  todo.completed
                    ? "bg-green-500 border-green-500"
                    : "border-white/40 hover:border-white/60"
                )}
              >
                {todo.completed && (
                  <Check className="w-4 h-4 text-white" />
                )}
              </button>

              {/* Todo Text */}
              <div className="flex-1">
                <p
                  className={cn(
                    "text-lg transition-all duration-200",
                    todo.completed
                      ? "text-white/50 line-through"
                      : "text-white"
                  )}
                >
                  {todo.text}
                </p>
                <p className="text-white/30 text-sm">
                  {todo.createdAt.toLocaleDateString()}
                </p>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => deleteTodo(todo.id)}
                className={cn(
                  "p-2 rounded-full transition-all duration-200",
                  "bg-red-500/0 hover:bg-red-500/20 text-red-400",
                  "opacity-0 group-hover:opacity-100"
                )}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Stats */}
      {todos.length > 0 && (
        <div className={cn(
          "mt-6 p-4 rounded-2xl",
          "bg-white/5 backdrop-blur-md border border-white/10",
          "flex justify-between items-center text-white/70"
        )}>
          <span>Total: {todos.length}</span>
          <span>Completed: {todos.filter(todo => todo.completed).length}</span>
          <span>Remaining: {todos.filter(todo => !todo.completed).length}</span>
        </div>
      )}
    </div>
  )
}