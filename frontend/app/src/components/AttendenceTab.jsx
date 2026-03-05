import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import { EmptyState, LoadingSpinner } from './LoadingSpinner';


const AttendanceTab = ({ employee, onBack }) => {
  const [attendances, setAttendances] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [attendanceDate, setAttendanceDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [selectedStatus, setSelectedStatus] = useState('present');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const resp = await api.get(`/${employee.id}/attendances`)
        setAttendances(resp);
      } catch (error) {
        toast.error('Failed to load employee data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [employee.id]);

  const handleMarkAttendance = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await api.post(`/${employee.id}/attendances`, {
        date: attendanceDate,
        status: selectedStatus,
      });
      toast.success('Attendance marked successfully!');
      
      // Refresh attendances
      const response = await api.get(`/${employee.id}/attendances`);
      setAttendances(response);
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to mark attendance');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading employee attendance..." />;
  }

  if (!employee) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Employee not found</h2>
        <button
          onClick={onBack}
          className="bg-gray-600 text-white px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors"
        >
          Back to Employees
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Employee Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-2xl p-8 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-bold">{employee.full_name}</h2>
              <p className="text-xl opacity-90">{employee.employee_id}</p>
              <p className="text-lg opacity-90">{employee.department} Department</p>
            </div>
          </div>
          <button
            onClick={onBack}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-xl font-semibold transition-all flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Employees</span>
          </button>
        </div>
      </div>

      {/* Mark Attendance Form */}
      <div className="bg-white rounded-2xl shadow-lg border p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Mark Attendance</h3>
        <form onSubmit={handleMarkAttendance} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Date</label>
            <input
              type="date"
              value={attendanceDate}
              onChange={(e) => setAttendanceDate(e.target.value)}
              className="w-full px-4 py-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>
          <div className="lg:col-span-2 flex items-end space-x-6">
            <div className="flex items-center space-x-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="present"
                  checked={selectedStatus === 'present'}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-5 h-5 text-emerald-600 border-gray-300 focus:ring-emerald-500"
                />
                <span className="ml-3 text-lg font-semibold text-emerald-700">Present</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="absent"
                  checked={selectedStatus === 'absent'}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-5 h-5 text-red-600 border-gray-300 focus:ring-red-500"
                />
                <span className="ml-3 text-lg font-semibold text-red-700">Absent</span>
              </label>
            </div>
          </div>
          <div className="lg:col-span-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-500 shadow-xl hover:shadow-2xl transition-all duration-200 disabled:opacity-50"
            >
              {isSubmitting ? 'Marking Attendance...' : 'Mark Attendance'}
            </button>
          </div>
        </form>
      </div>

      {/* Attendance History */}
      <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
          <h3 className="text-2xl font-bold text-gray-900">Attendance History</h3>
          <p className="text-gray-600 mt-1">{attendances.length} records</p>
        </div>
        {attendances.length === 0 ? (
          <EmptyState title="No attendance records" description="Mark attendance above to create first record" />
        ) : (
          <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {attendances.slice(0, 15).map((attendance) => (
              <div key={attendance.id} className="px-8 py-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${
                      attendance.status === 'present'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}>
                      {attendance.status === 'present' ? '✓' : '✗'}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 capitalize">
                        {attendance.status}
                      </p>
                      <p className="text-sm text-gray-500">
                        {format(parseISO(attendance.date), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                    attendance.status === 'present'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {attendance.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceTab;
