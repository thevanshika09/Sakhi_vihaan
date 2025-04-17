const API_BASE_URL = 'http://localhost:5000';

export const api = {
  // Health check
  checkHealth: async () => {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    return response.json();
  },

  // Activities
  activities: {
    create: async (data: any) => {
      const response = await fetch(`${API_BASE_URL}/api/activities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    getAll: async () => {
      const response = await fetch(`${API_BASE_URL}/api/activities`);
      return response.json();
    },
  },

  // Security Tips
  securityTips: {
    create: async (data: any) => {
      const response = await fetch(`${API_BASE_URL}/api/security-tips`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    getAll: async () => {
      const response = await fetch(`${API_BASE_URL}/api/security-tips`);
      return response.json();
    },
  },

  // Community Alerts
  communityAlerts: {
    create: async (data: any) => {
      const response = await fetch(`${API_BASE_URL}/api/community-alerts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    getAll: async () => {
      const response = await fetch(`${API_BASE_URL}/api/community-alerts`);
      return response.json();
    },
    report: async (alertId: string) => {
      const response = await fetch(`${API_BASE_URL}/api/community-alerts/${alertId}/report`, {
        method: 'POST',
      });
      return response.json();
    },
  },

  // User Stats
  stats: {
    get: async () => {
      const response = await fetch(`${API_BASE_URL}/api/stats`);
      return response.json();
    },
    update: async (data: any) => {
      const response = await fetch(`${API_BASE_URL}/api/stats`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return response.json();
    },
  },
}; 