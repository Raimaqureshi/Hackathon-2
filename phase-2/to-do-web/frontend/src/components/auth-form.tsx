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
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-400">
        {mode === 'signup' ? 'Create Your Account' : 'Welcome Back'}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {error && (
          <div className="bg-red-500 text-white p-3 rounded-lg text-center">
            {error}
          </div>
        )}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        <button
          type="submit"
          className="p-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-lg transition duration-300"
        >
          {mode === 'signup' ? 'Sign Up' : 'Log In'}
        </button>
      </form>
    </div>
  );
}
