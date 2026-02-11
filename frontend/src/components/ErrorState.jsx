import { AlertCircle } from 'lucide-react';

const ErrorState = ({ message = 'Something went wrong', onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-red-50 rounded-full p-6 mb-4">
        <AlertCircle className="w-12 h-12 text-red-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Error</h3>
      <p className="text-gray-600 text-center max-w-md mb-6">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary">
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
