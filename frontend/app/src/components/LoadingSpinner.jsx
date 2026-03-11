// src/components/LoadingSpinner.jsx
import React from 'react';

export const LoadingSpinner = ({ message = 'Loading...', size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center space-y-4">
      <div className={`animate-spin rounded-full border-4 border-blue-200 border-t-blue-600 ${sizeClasses[size]} ${className}`} />
      <p className="text-lg text-gray-600">{message}</p>
    </div>
  );
};

// export default LoadingSpinner;


export const EmptyState = ({ title, description, actionText, onAction }) => (
  <div className="p-12 text-center border-t border-gray-200">
    <div className="w-24 h-24 bg-gray-100 rounded-2xl mx-auto mb-6 flex items-center justify-center">
      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500 mb-6 max-w-sm mx-auto">{description}</p>
    {actionText && onAction && (
      <button
        onClick={onAction}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 font-medium transition-all"
      >
        {actionText}
      </button>
    )}
  </div>
);

// export default EmptyState;
