'use client';

import { Task } from '@/lib/types';
import { useState } from 'react';

type TaskItemProps = {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newDescription: string) => void;
};

export default function TaskItem({ task, onToggleComplete, onDelete, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleSave = () => {
    if (editedDescription.trim() !== task.description) {
      onEdit(task.id, editedDescription.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedDescription(task.description);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-700 rounded-lg shadow gap-3 sm:gap-0">
      <div className="flex flex-col flex-grow w-full">
        <div className="flex items-start sm:items-center w-full">
          <input
            type="checkbox"
            checked={task.is_complete}
            onChange={() => onToggleComplete(task.id)}
            className="w-5 h-5 mt-0.5 sm:mt-0 text-purple-600 bg-gray-600 border-gray-500 rounded focus:ring-purple-500"
          />
          {isEditing ? (
            <input
              type="text"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="ml-3 flex-grow p-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              onBlur={handleSave}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSave();
                if (e.key === 'Escape') handleCancel();
              }}
              autoFocus
            />
          ) : (
            <span
              className={`ml-3 text-base sm:text-lg break-words ${
                task.is_complete
                  ? 'line-through text-gray-500 opacity-70 bg-gray-600/30 px-1 rounded'
                  : 'text-white'
              }`}
              onDoubleClick={() => setIsEditing(true)}
            >
              {task.description}
            </span>
          )}
        </div>
        {/* Date and time display */}
        <div className="ml-8 sm:ml-8 mt-1 text-xs text-gray-400">
          Created: {new Date(task.created_at).toLocaleString()}
          {task.updated_at !== task.created_at && ` | Updated: ${new Date(task.updated_at).toLocaleString()}`}
        </div>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto justify-end mt-2 sm:mt-0">
        {isEditing ? (
          <>
            <button onClick={handleSave} className="text-green-400 hover:text-green-300 font-semibold text-sm sm:text-base w-full sm:w-auto text-center py-1">
              Save
            </button>
            <button onClick={handleCancel} className="text-gray-400 hover:text-gray-300 text-sm sm:text-base w-full sm:w-auto text-center py-1">
              Cancel
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)} className="text-blue-400 hover:text-blue-300 text-sm sm:text-base w-full sm:w-auto text-center py-1">
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="text-red-400 hover:text-red-300 text-sm sm:text-base w-full sm:w-auto text-center py-1"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

