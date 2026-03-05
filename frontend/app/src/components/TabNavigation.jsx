import React from 'react';

const TabNavigation = ({ activeTab, setActiveTab, selectedEmployee, setSelectedEmployee }) => {
  return (
    <div className="bg-white/80 backdrop-blur-md shadow-xl border border-white/50 rounded-2xl p-1">
      <nav className="flex space-x-1 mx-2" role="tablist">
        {/* Employees Tab */}
        <button
          role="tab"
          className={`flex-1 py-4 px-6 rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center space-x-2 group ${
            activeTab === 'employees'
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:shadow-md'
          }`}
          onClick={() => {
            setActiveTab('employees');
            setSelectedEmployee(null);
          }}
        >
          <svg className={`w-5 h-5 ${activeTab === 'employees' ? 'text-white' : 'text-gray-500 group-hover:text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span>Employees</span>
        </button>

        {/* Attendance Tab */}
        <button
          role="tab"
          className={`flex-1 py-4 px-6 rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center space-x-2 group ${
            activeTab === 'attendance'
              ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/25'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:shadow-md opacity-50 group-hover:opacity-100'
          }`}
          onClick={() => selectedEmployee && setActiveTab('attendance')}
          disabled={!selectedEmployee}
        >
          <svg className={`w-5 h-5 ${activeTab === 'attendance' ? 'text-white' : 'text-gray-500 group-hover:text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>Attendance</span>
        </button>
      </nav>

      {/* Employee Selection Info */}
      {activeTab === 'employees' && (
        <div className="px-6 pb-6 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {selectedEmployee ? `Selected: Employee ID ${selectedEmployee.full_name}` : 'No employee selected'}
              </p>
              <p className={`text-sm mt-1 ${selectedEmployee ? 'text-emerald-600 font-medium' : 'text-gray-500'}`}>
                {selectedEmployee ? 'Click attendance tab to manage records' : 'Select an employee from the list'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabNavigation;
