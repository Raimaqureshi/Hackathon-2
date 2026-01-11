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
    <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg shadow">
      <div className="flex items-center flex-grow">
        <input
          type="checkbox"
          checked={task.is_complete}
          onChange={() => onToggleComplete(task.id)}
          className="w-6 h-6 text-purple-600 bg-gray-600 border-gray-500 rounded focus:ring-purple-500"
        />
        {isEditing ? (
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="ml-4 flex-grow p-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            onBlur={handleSave}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') handleCancel();
            }}
            autoFocus
          />
        ) : (
          <span
            className={`ml-4 text-lg ${
              task.is_complete ? 'line-through text-gray-400' : 'text-white'
            }`}
            onDoubleClick={() => setIsEditing(true)}
          >
            {task.description}
          </span>
        )}
      </div>
      <div className="flex items-center space-x-3 ml-4">
        {isEditing ? (
          <>
            <button onClick={handleSave} className="text-green-400 hover:text-green-300 font-semibold">
              Save
            </button>
            <button onClick={handleCancel} className="text-gray-400 hover:text-gray-300">
              Cancel
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)} className="text-blue-400 hover:text-blue-300">
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="text-red-400 hover:text-red-300"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

