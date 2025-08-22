import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import HexagonBackground from './components/HexagonBackground';
import ProfileMenu from './components/ProfileMenu';
import AIChatButton from './components/AIChatButton';
import { userService } from './services/userService';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [currentUsername, setCurrentUsername] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const { isValid, isAdmin } = userService.validateUser(username, password);
    
    if (isValid) {
      setIsAuthenticated(true);
      setIsAdmin(isAdmin);
      setCurrentUsername(username);
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setShowAdminPanel(false);
    setUsername('');
    setPassword('');
    setCurrentUsername('');
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#10131d]">
        <HexagonBackground />
        <div className="fixed top-4 right-4 z-20 flex items-center gap-4">
          <ProfileMenu 
            username={currentUsername}
            isAdmin={isAdmin}
            onSignOut={handleSignOut}
            onToggleAdmin={() => setShowAdminPanel(!showAdminPanel)}
          />
        </div>
        <div className="relative z-10">
          {showAdminPanel && isAdmin ? <AdminPanel /> : <Dashboard />}
        </div>
        <AIChatButton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#10131d] flex items-center justify-center p-4 relative">
      <HexagonBackground />
      <div className="max-w-md w-full glass-effect p-8 rounded-xl shadow-2xl relative z-10">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#3bd4cb] to-[#2fa69f] transform transition-all duration-300 hover:scale-110 shadow-[0_0_20px_rgba(59,212,203,0.3)] hover:shadow-[0_0_30px_rgba(59,212,203,0.5)]">
                <div className="absolute inset-0.5 bg-[#10131d] rounded-full flex items-center justify-center overflow-hidden">
                  <div className="relative text-3xl font-bold text-[#3bd4cb] transform transition-transform hover:scale-110">
                    A
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3bd4cb] to-transparent opacity-20"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-white">Adapt</h2>
          <p className="mt-2 text-sm text-gray-300">Sign in to access the code transformer</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg relative">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white/5 border border-gray-600 rounded-lg text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3bd4cb] focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white/5 border border-gray-600 rounded-lg text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3bd4cb] focus:border-transparent"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-[#10131d] bg-[#3bd4cb] hover:bg-[#2fa69f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3bd4cb] transition-all duration-200"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;