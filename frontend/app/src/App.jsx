import React, { useState, useEffect, useCallback } from 'react';
import { Toaster } from 'react-hot-toast';

import api from './services/api';
import './index.css';
import TabNavigation from './components/TabNavigation';
import EmployeeManagementTab from './components/EmployeeManagementTab';
import AttendanceTab from './components/AttendenceTab';

const App = () => {
  const [activeTab, setActiveTab] = useState('employees');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [isLoadingEmployees, setIsLoadingEmployees] = useState(true);
  const [employeeError, setEmployeeError] = useState(null);

  // Fetch employees
  const fetchEmployees = useCallback(async () => {
    try {
      setIsLoadingEmployees(true);
      setEmployeeError(null);
      const response = await api.get('/');
      setEmployees(response);
    } catch (error) {
      setEmployeeError('Failed to load employees');
      console.error('Error fetching employees:', error);
    } finally {
      setIsLoadingEmployees(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const refreshEmployees = () => fetchEmployees();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            HRMS Lite
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage employee records and track daily attendance efficiently
          </p>
        </div>

        {/* Tabs Navigation */}
        <TabNavigation 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          selectedEmployee={selectedEmployee}
          setSelectedEmployee={setSelectedEmployee}
        />

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === 'employees' && (
            <EmployeeManagementTab 
              employees={employees}
              isLoadingEmployees={isLoadingEmployees}
              employeeError={employeeError}
              refreshEmployees={refreshEmployees}
              selectedEmployee={selectedEmployee}
              setSelectedEmployee={setSelectedEmployee}
              setActiveTab={setActiveTab}
            />
          )}
          {activeTab === 'attendance' && selectedEmployee && (
            <AttendanceTab 
              employee={selectedEmployee}
              onBack={() => {
                setActiveTab('employees');
                setSelectedEmployee(null);
              }}
            />
          )}
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default App;
