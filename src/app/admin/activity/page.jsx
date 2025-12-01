'use client';

import { useState, useEffect } from 'react';
import { FaEye, FaUser, FaMapMarkerAlt, FaDesktop, FaMobile, FaTablet, FaFilter, FaCheck } from 'react-icons/fa';

export default function ActivityLogPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [unreadCount, setUnreadCount] = useState(0);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

  useEffect(() => {
    fetchActivities();
  }, [filter, pagination.page]);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: '50',
      });

      if (filter !== 'all') {
        params.append('type', filter);
      }

      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/activities?${params}`, {
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await res.json();

      setActivities(data.activities || []);
      setPagination(data.pagination || { page: 1, pages: 1, total: 0 });
      setUnreadCount(data.unreadCount || 0);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch('/api/admin/activities', {
        method: 'PUT',
        credentials: 'include',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ markAllAsRead: true }),
      });
      fetchActivities();
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const getIcon = (type, device) => {
    if (type === 'user-login') {
      return <FaUser className="text-green-400" />;
    }
    if (type === 'page-view') {
      return <FaEye className="text-purple-400" />;
    }
    // Device icon for visitors
    if (device?.type === 'Mobile') {
      return <FaMobile className="text-blue-400" />;
    }
    if (device?.type === 'Tablet') {
      return <FaTablet className="text-blue-400" />;
    }
    return <FaDesktop className="text-blue-400" />;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Activity Log</h1>
          <p className="text-gray-400 mt-1">
            {unreadCount > 0 && (
              <span className="text-yellow-400">{unreadCount} unread • </span>
            )}
            {pagination.total} total activities
          </p>
        </div>
        <button
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
          className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaCheck /> Mark All as Read
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 flex-wrap">
          <FaFilter className="text-gray-400" />
          <span className="text-gray-400 mr-2">Filter:</span>
          {['all', 'visitor', 'user-login', 'page-view'].map((type) => (
            <button
              key={type}
              onClick={() => {
                setFilter(type);
                setPagination({ ...pagination, page: 1 });
              }}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === type
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {type === 'all' ? 'All' : type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </button>
          ))}
        </div>
      </div>

      {/* Activity List */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : activities.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-12 text-center">
          <p className="text-gray-400 text-lg">No activities found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {activities.map((activity) => (
            <div
              key={activity._id}
              className={`bg-gray-800 rounded-lg p-4 border-l-4 ${
                activity.read ? 'border-gray-600' : 'border-yellow-400'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {getIcon(activity.type, activity.device)}
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{activity.message}</p>
                  
                  <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-400">
                    {activity.location && (
                      <div className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-red-400" />
                        <span>
                          {activity.location.city}, {activity.location.country}
                          {activity.location.ip && ` (${activity.location.ip})`}
                        </span>
                      </div>
                    )}
                    
                    {activity.device && (
                      <div className="flex items-center gap-2">
                        <span className="bg-gray-700 px-2 py-1 rounded">
                          {activity.device.type}
                        </span>
                        <span className="bg-gray-700 px-2 py-1 rounded">
                          {activity.device.browser}
                        </span>
                        <span className="bg-gray-700 px-2 py-1 rounded">
                          {activity.device.os}
                        </span>
                      </div>
                    )}
                  </div>

                  {activity.page && (
                    <p className="text-gray-500 text-sm mt-2">
                      Page: <span className="text-purple-400">{activity.page}</span>
                    </p>
                  )}

                  {activity.user?.email && (
                    <p className="text-gray-500 text-sm mt-1">
                      User: <span className="text-green-400">{activity.user.email}</span>
                    </p>
                  )}
                </div>

                <div className="text-right">
                  <p className="text-gray-500 text-sm">{formatDate(activity.createdAt)}</p>
                  {!activity.read && (
                    <span className="inline-block mt-2 bg-yellow-400 text-gray-900 text-xs px-2 py-1 rounded">
                      NEW
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
            disabled={pagination.page === 1}
            className="bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg"
          >
            Previous
          </button>
          <span className="bg-gray-800 text-white px-4 py-2 rounded-lg">
            Page {pagination.page} of {pagination.pages}
          </span>
          <button
            onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
            disabled={pagination.page === pagination.pages}
            className="bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
