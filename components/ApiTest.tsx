import { useState } from 'react';
import { api } from '@/lib/api';

export default function ApiTest() {
  const [apiStatus, setApiStatus] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    try {
      setLoading(true);
      const response = await api.checkHealth();
      setApiStatus(JSON.stringify(response, null, 2));
    } catch (error) {
      setApiStatus('Error connecting to API');
      console.error('API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">API Connection Test</h2>
      <button
        onClick={testConnection}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? 'Testing...' : 'Test API Connection'}
      </button>
      {apiStatus && (
        <pre className="mt-4 p-4 bg-gray-100 rounded">
          {apiStatus}
        </pre>
      )}
    </div>
  );
} 