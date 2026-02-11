import { useEffect, useState } from 'react';
import { Users, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { dashboardAPI } from '../api/config';
import Loading from '../components/Loading';
import ErrorState from '../components/ErrorState';

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchSummary = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await dashboardAPI.getSummary();
      setSummary(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchSummary();
  }, []);
  
  if (loading) return <Loading message="Loading dashboard..." />;
  if (error) return <ErrorState message={error} onRetry={fetchSummary} />;
  
  const stats = [
    {
      title: 'Total Employees',
      value: summary?.total_employees || 0,
      icon: Users,
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      title: 'Total Attendance Records',
      value: summary?.total_attendance_records || 0,
      icon: Calendar,
      color: 'purple',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      title: 'Present Today',
      value: summary?.present_today || 0,
      icon: CheckCircle,
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      title: 'Absent Today',
      value: summary?.absent_today || 0,
      icon: XCircle,
      color: 'red',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
    },
  ];
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Overview of your HR management system</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} rounded-lg p-3`}>
                  <Icon className={`w-8 h-8 ${stat.textColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Welcome Message */}
      <div className="mt-8 card p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Welcome to HRMS Lite</h2>
        <p className="text-gray-600 mb-4">
          This is a lightweight Human Resource Management System designed to help you manage employee records and track attendance efficiently.
        </p>
        <div className="space-y-2">
          <p className="text-gray-700"><strong>Features:</strong></p>
          <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
            <li>Manage employee records with ease</li>
            <li>Track daily attendance for all employees</li>
            <li>View comprehensive attendance history</li>
            <li>Monitor present/absent statistics</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
