

import React from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="m-4 p-4 border border-red-500 rounded-lg bg-red-50 text-red-700 shadow-lg w-full mx-auto">
      <div className="flex items-center space-x-2">
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-red-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m0 0v6m0-6h-6m6 0h6"
          />
        </svg> */}
        <h2 className="font-bold text-lg">Error</h2>
      </div>
      <p className="mt-2 text-sm">{message}</p>
    </div>
  );
};

export default ErrorMessage;
