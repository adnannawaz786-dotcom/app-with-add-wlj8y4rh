import React from 'react';
import { Trash2, Check } from 'lucide-react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div className="group relative backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-4 mb-3 shadow-lg hover:bg-white/15 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      {/* Glass morphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-xl pointer-events-none" />
      
      <div className="relative flex items-center justify-between gap-3">
        {/* Checkbox and text container */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Custom checkbox */}
          <button
            onClick={() => onToggle(todo.id)}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
              todo.completed
                ? 'bg-emerald-500/80 border-emerald-400 shadow-lg shadow-emerald-500/30'
                : 'border-white/40 hover:border-white/60 hover:bg-white/10'
            }`}
          >
            {todo.completed && (
              <Check className="w-4 h-4 text-white animate-in fade-in duration-200" />
            )}
          </button>
          
          {/* Todo text */}
          <span
            className={`text-white/90 transition-all duration-300 break-words ${
              todo.completed
                ? 'line-through text-white/50'
                : 'hover:text-white'
            }`}
          >
            {todo.text}
          </span>
        </div>
        
        {/* Delete button */}
        <button
          onClick={() => onDelete(todo.id)}
          className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-500/20 border border-red-400/30 text-red-300 hover:bg-red-500/30 hover:text-red-200 hover:border-red-400/50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:scale-110"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      
      {/* Completion indicator line */}
      {todo.completed && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400/50 to-emerald-600/50 rounded-b-xl" />
      )}
    </div>
  );
};

export default TodoItem;