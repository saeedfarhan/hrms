import React, { useState } from 'react';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import ConfirmationModal from './ConfirmationModel';

const EmployeeList = ({ 
  employees, 
  selectedEmployeeId, 
  onSelectEmployee, 
  onDeleteSuccess,
  setActiveTab
}) => {
  const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteConfirm = async () => {
    if (!deleteEmployeeId) return;
    
    try {
      setIsDeleting(true);
      await api.delete(`/${deleteEmployeeId}`);
      toast.success('Employee deleted successfully!');
      onDeleteSuccess();
    } catch (error) {
      toast.error('Failed to delete employee');
    } finally {
      setIsDeleting(false);
      setDeleteEmployeeId(null);
    }
  };

  const handleDeleteClick = (employeeId, e) => {
    e.stopPropagation();
    setDeleteEmployeeId(employeeId);
  };

  return (
    <>
      <div className="max-h-96 overflow-y-auto divide-y divide-gray-200">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className={`p-6 hover:bg-gray-50 transition-all duration-200 cursor-pointer group border-l-4 ${
              selectedEmployeeId === employee.id
                ? 'border-emerald-500 bg-emerald-50 shadow-md'
                : 'border-transparent hover:border-blue-200'
            }`}
            onClick={() => {
              onSelectEmployee(employee)
              setActiveTab('attendance')
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-900 truncate mb-1">
                  {employee.full_name}
                </h3>
                <p className="text-sm text-gray-500 truncate mb-1">{employee.email}</p>
                <p className="text-sm font-mono bg-gray-100 px-2 py-1 rounded text-xs mb-2">
                  {employee.employee_id}
                </p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm">
                  {employee.department}
                </span>
              </div>
              <div className="ml-4 flex-shrink-0 flex items-center space-x-2">
                {selectedEmployeeId === employee.id && (
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                )}
                <button
                  onClick={(e) => handleDeleteClick(employee.id, e)}
                  disabled={isDeleting}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all group-hover:opacity-100 opacity-0 group-hover:opacity-100 disabled:opacity-50"
                  title="Delete employee"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteEmployeeId !== null}
        title="Delete Employee"
        message="Are you sure you want to delete this employee? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteEmployeeId(null)}
        isLoading={isDeleting}
        confirmText="Delete Employee"
        confirmButtonColor="red"
      />
    </>
  );
};

export default EmployeeList;
