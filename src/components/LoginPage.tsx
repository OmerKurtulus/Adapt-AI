import React, { useState } from 'react';
import { Code2, LogIn } from 'lucide-react';

interface LoginPageProps {
  onLogin: (username: string, password: string) => void;
}

function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div className="text-center">
          <div className="flex justify-center">
            <Code2 className="h-12 w-12 text-[#013c68]" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-[#0d1d4c]">Adapt</h2>
          <p className="mt-2 text-sm text-gray-600">Transform your legacy code into modern, responsive designs</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="text-sm font-medium text-[#0d1d4c]">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#013c68] focus:border-[#013c68] focus:z-10 sm:text-sm mt-1"
                placeholder="Enter your username"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium text-[#0d1d4c]">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#013c68] focus:border-[#013c68] focus:z-10 sm:text-sm mt-1"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#013c68] hover:bg-[#0d1d4c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#013c68] transition-colors duration-200"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <LogIn className="h-5 w-5 text-[#013c68] group-hover:text-[#013c68]" aria-hidden="true" />
            </span>
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;