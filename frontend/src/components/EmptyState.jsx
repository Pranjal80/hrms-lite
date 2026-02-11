import { FileQuestion } from 'lucide-react';

const EmptyState = ({ 
  icon: Icon = FileQuestion, 
  title = 'No data found', 
  description = '',
  action 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-gray-100 rounded-full p-6 mb-4">
        <Icon className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-600 text-center max-w-md mb-6">{description}</p>
      )}
      {action}
    </div>
  );
};

export default EmptyState;
