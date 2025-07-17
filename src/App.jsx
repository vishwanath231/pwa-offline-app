import React, { useState, useEffect } from 'react';
import { db } from './db';

const App = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);

  const saveUser = async () => {
    if (!username || !email) {
      alert('Both fields required');
      return;
    }
    await db.users.add({ username, email });
    setUsername('');
    setEmail('');
    loadUsers();
  };

  const loadUsers = async () => {
    const all = await db.users.toArray();
    setUsers(all);
  };

  const clearUsers = async () => {
    await db.users.clear();
    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1>User Form</h1>
      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="block border p-2 mb-2 w-full"
      />
      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="block border p-2 mb-4 w-full"
      />
      <button onClick={saveUser} className="bg-blue-500 text-white px-4 py-2 mb-4">
        Save Offline
      </button>

      <h2>Saved Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.username} - {user.email}</li>
        ))}
      </ul>

      {users.length > 0 && (
        <button onClick={clearUsers} className="bg-red-500 text-white px-4 py-2 mt-2">
          Clear All
        </button>
      )}
    </div>
  );
};

export default App;
