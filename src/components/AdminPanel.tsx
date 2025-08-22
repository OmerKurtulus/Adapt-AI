import React, { useState, useEffect } from 'react';
import { userService, User } from '../services/userService';
import { UserPlus, UserMinus, Users, X } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    setUsers(userService.getUsers());
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!newUsername || !newPassword) {
      setError('Username and password are required.');
      return;
    }

    const result = userService.addUser(newUsername, newPassword);
    if (result) {
      setSuccess('User added successfully.');
      setNewUsername('');
      setNewPassword('');
      loadUsers();
    } else {
      setError('This username is already in use.');
    }
  };

  const handleRemoveUser = (username: string) => {
    if (username === 'admin.OmerKurtulus') {
      setError('Admin user cannot be deleted.');
      return;
    }

    const result = userService.removeUser(username);
    if (result) {
      setSuccess('User deleted successfully.');
      loadUsers();
    } else {
      setError('An error occurred while deleting the user.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 glass-effect rounded-xl shadow-xl relative">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Users className="h-6 w-6" />
          User Management
        </h2>
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('toggleAdmin'))}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="h-6 w-6 text-gray-400 hover:text-white" />
        </button>
      </div>

      {(error || success) && (
        <div className={`p-4 mb-6 rounded-lg ${
          error ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-green-500/10 border-green-500/20 text-green-400'
        }`}>
          {error || success}
        </div>
      )}

      <form onSubmit={handleAddUser} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-gray-600 rounded-lg text-white"
              placeholder="New username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-gray-600 rounded-lg text-white"
              placeholder="New password"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 flex items-center gap-2 px-4 py-2 bg-[#3bd4cb] text-[#10131d] rounded-lg hover:bg-[#2fa69f] transition-colors"
        >
          <UserPlus className="h-5 w-5" />
          Add User
        </button>
      </form>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white mb-4">User List</h3>
        <div className="grid gap-4">
          {users.map((user) => (
            <div
              key={user.username}
              className="flex items-center justify-between p-4 glass-effect rounded-lg"
            >
              <div>
                <p className="text-white font-medium">{user.username}</p>
                {user.isAdmin && (
                  <span className="text-xs text-[#3bd4cb]">Admin</span>
                )}
              </div>
              {!user.isAdmin && (
                <button
                  onClick={() => handleRemoveUser(user.username)}
                  className="p-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  <UserMinus className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;