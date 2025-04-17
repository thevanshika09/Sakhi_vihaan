import { useState } from 'react';
import { api } from '@/lib/api';

export default function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.users.create(formData);
      setMessage('User created successfully!');
      setFormData({ name: '', email: '', phone: '' });
      fetchUsers(); // Refresh the user list
    } catch (error) {
      setMessage('Error creating user');
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
            placeholder="Enter your name"
            title="Please enter your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
            placeholder="Enter your email"
            title="Please enter a valid email address"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
            placeholder="Enter your phone number"
            title="Please enter your phone number"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? 'Adding...' : 'Add User'}
        </button>
      </form>
      {message && (
        <div className="mt-4 p-2 bg-green-100 text-green-700 rounded">
          {message}
        </div>
      )}
      
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Users List</h3>
        <button
          onClick={fetchUsers}
          className="mb-4 py-2 px-4 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Refresh Users
        </button>
        <div className="space-y-4">
          {users.map((user: any) => (
            <div key={user.id} className="p-4 border rounded">
              <p><strong>Name:</strong> {user.data.name}</p>
              <p><strong>Email:</strong> {user.data.email}</p>
              <p><strong>Phone:</strong> {user.data.phone}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 