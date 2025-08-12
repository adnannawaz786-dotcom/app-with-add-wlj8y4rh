import React, { useState } from 'react'
import { Trash2, Plus, Check } from 'lucide-react'
import { cn } from './lib/utils'

function App() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      }])
      setInputValue('')
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
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="backdrop-blur-lg bg-white/20 rounded-3xl p-8 shadow-2xl border border-white/30">
          <h1 className="text-3xl font-bold text-white text-center mb-8 drop-shadow-lg">
            Todo App
          </h1>

          {/* Add Todo Input */}
          <div className="mb-8">
            <div className="flex gap-3">
              <div className="flex-1 backdrop-blur-sm bg-white/10 rounded-2xl border border-white/20 p-1">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add a new todo..."
                  className="w-full bg-transparent text-white placeholder-white/70 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
              <button
                onClick={addTodo}
                className="backdrop-blur-sm bg-white/20 hover:bg-white/30 transition-all duration-200 rounded-2xl p-4 border border-white/30 group"
              >
                <Plus className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>

          {/* Todo List */}
          <div className="space-y-3">
            {todos.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-white/70 text-lg">No todos yet</p>
                <p className="text-white/50 text-sm mt-2">Add one above to get started</p>
              </div>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className={cn(
                    "backdrop-blur-sm bg-white/10 rounded-2xl p-4 border border-white/20 transition-all duration-300",
                    "hover:bg-white/15 hover:scale-[1.02] hover:shadow-lg"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={cn(
                        "flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center",
                        todo.completed
                          ? "bg-green-500 border-green-500"
                          : "border-white/40 hover:border-white/60"
                      )}
                    >
                      {todo.completed && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </button>

                    <span
                      className={cn(
                        "flex-1 text-white transition-all duration-300",
                        todo.completed
                          ? "line-through opacity-60"
                          : "opacity-90"
                      )}
                    >
                      {todo.text}
                    </span>

                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="flex-shrink-0 p-2 rounded-xl hover:bg-red-500/20 transition-colors duration-200 group"
                    >
                      <Trash2 className="w-4 h-4 text-white/70 group-hover:text-red-300 transition-colors" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Stats */}
          {todos.length > 0 && (
            <div className="mt-8 pt-6 border-t border-white/20">
              <div className="flex justify-between text-white/70 text-sm">
                <span>Total: {todos.length}</span>
                <span>Completed: {todos.filter(todo => todo.completed).length}</span>
                <span>Remaining: {todos.filter(todo => !todo.completed).length}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App