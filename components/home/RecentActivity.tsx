import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import styles from "@/styles/home/RecentActivity.module.css"

interface ActivityProps {
  title: string;
  time: string;
  status: 'safe' | 'warning' | 'danger';
}

export default function RecentActivity({ title, time, status }: ActivityProps) {
  const saveActivity = async () => {
    try {
      const activityData = {
        title,
        time,
        status,
        userId: 'current-user-id', // Replace with actual user ID when auth is implemented
        timestamp: new Date().toISOString()
      };
      
      await api.users.create(activityData);
    } catch (error) {
      console.error('Error saving activity:', error);
    }
  };

  const statusColors = {
    safe: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800'
  };

  // Save activity when component mounts
  useEffect(() => {
    saveActivity();
  }, []);

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow mb-2">
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-500">{time}</p>
      </div>
      <span className={`px-3 py-1 rounded-full text-sm ${statusColors[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    </div>
  );
}

function getStatusIcon(status: string): string {
  switch (status) {
    case "safe":
      return "✅"
    case "warning":
      return "⚠️"
    case "danger":
      return "❌"
    default:
      return "❓"
  }
}
