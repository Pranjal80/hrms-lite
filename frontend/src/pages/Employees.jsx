import { useEffect, useState } from 'react';
import { Plus, Trash2, Mail, Building2 } from 'lucide-react';
import { employeeAPI } from '../api/config';
import Loading from '../components/Loading';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import Modal from '../components/Modal';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    employee_id: '',
    full_name: '',
    email: '',
    department: '',
  });
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await employeeAPI.getAll();
      setEmployees(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchEmployees();
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormError('');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.employee_id.trim() || !formData.full_name.trim() || 
        !formData.email.trim() || !formData.department.trim()) {
      setFormError('All fields are required');
      return;
    }
    
    try {
      setSubmitting(true);
      setFormError('');
      await employeeAPI.create(formData);
      await fetchEmployees();
      setIsModalOpen(false);
      setFormData({ employee_id: '', full_name: '', email: '', department: '' });
    } catch (err) {
      setFormError(err.response?.data?.detail || 'Failed to create employee');
    } finally {
      setSubmitting(false);
    }
  };
  
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) {
      return;
    }
    
    try {
      await employeeAPI.delete(id);
      await fetchEmployees();
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to delete employee');
    }
  };
  
  if (loading) return <Loading message="Loading employees..." />;
  if (error) return <ErrorState message={error} onRetry={fetchEmployees} />;
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
          <p className="mt-2 text-gray-600">Manage your employee records</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Employee</span>
        </button>
      </div>
      
      {employees.length === 0 ? (
        <EmptyState
          title="No employees found"
          description="Get started by adding your first employee"
          action={
            <button onClick={() => setIsModalOpen(true)} className="btn-primary">
              Add Employee
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((employee) => (
            <div key={employee.id} className="card p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-primary-50 rounded-lg p-3">
                  <span className="text-primary-700 font-bold text-lg">
                    {employee.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(employee.id, employee.full_name)}
                  className="text-gray-400 hover:text-red-600 transition-colors"
                  title="Delete employee"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {employee.full_name}
              </h3>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium mr-2">ID:</span>
                  <span>{employee.employee_id}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>{employee.email}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Building2 className="w-4 h-4 mr-2" />
                  <span>{employee.department}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Add Employee Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setFormData({ employee_id: '', full_name: '', email: '', department: '' });
          setFormError('');
        }}
        title="Add New Employee"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {formError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {formError}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employee ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="employee_id"
              value={formData.employee_id}
              onChange={handleInputChange}
              className="input-field"
              placeholder="e.g., EMP001"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleInputChange}
              className="input-field"
              placeholder="e.g., John Doe"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="input-field"
              placeholder="e.g., john@company.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="input-field"
              placeholder="e.g., Engineering"
              required
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setFormData({ employee_id: '', full_name: '', email: '', department: '' });
                setFormError('');
              }}
              className="btn-secondary"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={submitting}
            >
              {submitting ? 'Adding...' : 'Add Employee'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Employees;
