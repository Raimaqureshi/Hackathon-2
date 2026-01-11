'use client';

import { useState, useEffect } from 'react';
import { removeToken } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { getTasks, createTask, toggleTaskCompletion, deleteTask, updateTask } from '@/lib/task-api';
import { Task } from '@/lib/types';
import TaskList from '@/components/task-list';
import toast, { Toaster } from 'react-hot-toast';

export default function DashboardPage() {
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (err: any) {
        toast.error(err.message || 'Failed to fetch tasks.');
        if (err.message === 'Invalid token' || err.message === 'Not authenticated') {
          router.push('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [router]);

  const handleLogout = () => {
    removeToken();
    toast.success('Logged out successfully!');
    router.push('/login');
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskDescription.trim()) return;

    try {
      const newTask = await createTask(newTaskDescription);
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTaskDescription('');
      toast.success('Task created successfully!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to create task.');
    }
  };

  const handleToggleComplete = async (id: string) => {
    try {
      const updatedTask = await toggleTaskCompletion(id);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? updatedTask : task))
      );
      toast.success('Task updated successfully!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to update task.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      toast.success('Task deleted successfully!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete task.');
    }
  };

  const handleEditTask = async (id: string, newDescription: string) => {
    try {
      const updatedTask = await updateTask(id, newDescription);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? updatedTask : task))
      );
      toast.success('Task updated successfully!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to edit task.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-2xl font-semibold">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Toaster position="top-center" reverseOrder={false} />
      <header className="bg-gray-800 p-4 flex justify-between items-center shadow-md">
        <h1 className="text-3xl font-bold text-purple-400">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Log Out
        </button>
      </header>
      <main className="p-8">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleCreateTask} className="mb-8 flex gap-4">
            <input
              type="text"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-grow p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300"
            >
              Add Task
            </button>
          </form>

          <TaskList
            tasks={tasks}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDelete}
            onEdit={handleEditTask}
          />
        </div>
      </main>
    </div>
  );
}
