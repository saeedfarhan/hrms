import React, { useState } from 'react';
import EmployeeForm from './EmployeeForm';
import { EmptyState, LoadingSpinner } from './LoadingSpinner';
import EmployeeList from './EmployeeList';


const EmployeeManagementTab = ({
  employees,
  isLoadingEmployees,
  employeeError,
  refreshEmployees,
  selectedEmployeeId,
  setSelectedEmployee,
  setActiveTab
}) => {
  const [showForm, setShowForm] = useState(false);

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
  };

  if (employeeError) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border p-12 text-center">
        <div className="text-red-500 w-16 h-16 mx-auto mb-4">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{employeeError}</h3>
        <p className="text-gray-500 mb-6">Please check your connection and refresh</p>
        <button
          onClick={refreshEmployees}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 font-medium transition-all"
        >
          Refresh Employees
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Employee Form */}
      <div className="lg:col-span-1">
        <div className={`bg-white rounded-2xl shadow-lg border transition-all duration-300 ${showForm ? 'lg:col-span-1' : ''}`}>
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Add Employee</h2>
            </div>
          </div>
          <EmployeeForm onSuccess={refreshEmployees} />
         
        </div>
      </div>

      {/* Employee List */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
            <h2 className="text-2xl font-bold text-gray-900">Employee Directory</h2>
            <p className="text-gray-600 mt-1">
              {isLoadingEmployees ? 'Loading...' : `${employees.length} employees`}
            </p>
          </div>

          {isLoadingEmployees ? (
            <LoadingSpinner message="Loading employees..." />
          ) : employees.length === 0 ? (
            <EmptyState 
              title="No employees yet"
              description="Create your first employee using the form above"
              actionText="Show Form"
              onAction={() => setShowForm(true)}
            />
          ) : (
            <EmployeeList
              employees={employees}
              selectedEmployeeId={selectedEmployeeId}
              onSelectEmployee={handleEmployeeSelect}
              onRefresh={refreshEmployees}
              onDeleteSuccess={refreshEmployees}
              setActiveTab={setActiveTab}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagementTab;
