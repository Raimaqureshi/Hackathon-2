'use client';

import { Task } from '@/lib/types';
import TaskItem from './task-item';

type TaskListProps = {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newDescription: string) => void;
};

export default function TaskList({ tasks, onToggleComplete, onDelete, onEdit }: TaskListProps) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      {tasks.length === 0 ? (
        <p className="text-center text-gray-400">No tasks yet. Add one above!</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}
