'use client';

import { useState } from 'react';
import { signup, login } from '@/lib/auth-api';
import { storeToken } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';


type AuthFormProps = {
  mode?: 'login' | 'signup';
};

export default function AuthForm({ mode = 'signup' }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (mode === 'signup') {
        await signup({ email, password });
        const { access_token } = await login({ email, password });
        storeToken(access_token);
        router.push('/dashboard');
      } else {
        const { access_token } = await login({ email, password });
        storeToken(access_token);
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-xs sm:max-w-md border border-gray-700">
      <div className="text-center mb-6">
        <div className="mx-auto bg-gradient-to-r from-purple-500 to-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
          {mode === 'signup' ? 'Create Your Account' : 'Welcome Back'}
        </h2>
        <p className="text-gray-400 mt-2">
          {mode === 'signup'
            ? 'Join us to organize your tasks'
            : 'Sign in to manage your tasks'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-200 p-3 rounded-lg text-center text-sm">
            {error}
          </div>
        )}
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
            className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent peer pl-12"
            required
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-gray-400 peer-focus:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="relative">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" "
            className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent peer pl-12"
            required
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-gray-400 peer-focus:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <button
          type="submit"
          className="p-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-lg text-base sm:text-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          {mode === 'signup' ? 'Create Account' : 'Sign In'}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-400">
        <p>
          {mode === 'signup'
            ? 'Already have an account? '
            : "Don't have an account? "}
          <a
            href={mode === 'signup' ? '/login' : '/signup'}
            className="text-purple-400 hover:text-purple-300 font-medium underline"
          >
            {mode === 'signup' ? 'Sign In' : 'Sign Up'}
          </a>
        </p>
      </div>
    </div>
  );
}
