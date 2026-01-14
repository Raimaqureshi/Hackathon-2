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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Toaster position="top-center" reverseOrder={false} />
      <header className="bg-gray-800 p-4 sm:p-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
              Task Dashboard
            </h1>
            <p className="text-gray-400 text-sm mt-1">Organize your tasks efficiently</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-sm text-gray-400">{new Date().toLocaleDateString()}</p>
              <p className="text-sm text-gray-400">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 w-full sm:w-auto"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>
      <main className="p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleCreateTask} className="mb-8 flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-grow p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 w-full sm:w-auto shadow-md"
            >
              Add Task
            </button>
          </form>

          <div className="bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-300">Your Tasks</h2>
              <span className="bg-purple-600 text-white text-sm font-medium py-1 px-3 rounded-full">
                {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
              </span>
            </div>

            <TaskList
              tasks={tasks}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDelete}
              onEdit={handleEditTask}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
