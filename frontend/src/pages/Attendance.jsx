import { useEffect, useState } from 'react';
import { Plus, CheckCircle, XCircle, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { employeeAPI, attendanceAPI } from '../api/config';
import Loading from '../components/Loading';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import Modal from '../components/Modal';

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    employee_id: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    status: 'Present',
  });
  
  const [filters, setFilters] = useState({
    employee_id: '',
    start_date: '',
    end_date: '',
  });
  
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [employeesRes, attendanceRes] = await Promise.all([
        employeeAPI.getAll(),
        attendanceAPI.getAll(filters),
      ]);
      
      setEmployees(employeesRes.data);
      setAttendanceRecords(attendanceRes.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const applyFilters = async () => {
    await fetchData();
  };
  
  const clearFilters = async () => {
    setFilters({ employee_id: '', start_date: '', end_date: '' });
    await fetchData();
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormError('');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.employee_id || !formData.date || !formData.status) {
      setFormError('All fields are required');
      return;
    }
    
    try {
      setSubmitting(true);
      setFormError('');
      
      await attendanceAPI.mark({
        employee_id: parseInt(formData.employee_id),
        date: formData.date,
        status: formData.status,
      });
      
      await fetchData();
      setIsModalOpen(false);
      setFormData({
        employee_id: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        status: 'Present',
      });
    } catch (err) {
      setFormError(err.response?.data?.detail || 'Failed to mark attendance');
    } finally {
      setSubmitting(false);
    }
  };
  
  if (loading) return <Loading message="Loading attendance records..." />;
  if (error) return <ErrorState message={error} onRetry={fetchData} />;
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance</h1>
          <p className="mt-2 text-gray-600">Track and manage employee attendance</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="btn-primary flex items-center space-x-2"
          disabled={employees.length === 0}
        >
          <Plus className="w-5 h-5" />
          <span>Mark Attendance</span>
        </button>
      </div>
      
      {/* Filters */}
      <div className="card p-6 mb-6">
        <div className="flex items-center mb-4">
          <Filter className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employee
            </label>
            <select
              name="employee_id"
              value={filters.employee_id}
              onChange={handleFilterChange}
              className="input-field"
            >
              <option value="">All Employees</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>
                  {emp.full_name} ({emp.employee_id})
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              name="start_date"
              value={filters.start_date}
              onChange={handleFilterChange}
              className="input-field"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              name="end_date"
              value={filters.end_date}
              onChange={handleFilterChange}
              className="input-field"
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-4">
          <button onClick={clearFilters} className="btn-secondary">
            Clear Filters
          </button>
          <button onClick={applyFilters} className="btn-primary">
            Apply Filters
          </button>
        </div>
      </div>
      
      {/* Attendance Records */}
      {attendanceRecords.length === 0 ? (
        <EmptyState
          title="No attendance records found"
          description={employees.length === 0 
            ? "Add employees first to start marking attendance"
            : "Mark attendance for your employees"}
          action={
            employees.length > 0 && (
              <button onClick={() => setIsModalOpen(true)} className="btn-primary">
                Mark Attendance
              </button>
            )
          }
        />
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendanceRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {record.employee.full_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {record.employee.employee_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {record.employee.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {format(new Date(record.date), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        record.status === 'Present'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {record.status === 'Present' ? (
                          <CheckCircle className="w-4 h-4 mr-1" />
                        ) : (
                          <XCircle className="w-4 h-4 mr-1" />
                        )}
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Mark Attendance Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setFormData({
            employee_id: '',
            date: format(new Date(), 'yyyy-MM-dd'),
            status: 'Present',
          });
          setFormError('');
        }}
        title="Mark Attendance"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {formError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {formError}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employee <span className="text-red-500">*</span>
            </label>
            <select
              name="employee_id"
              value={formData.employee_id}
              onChange={handleInputChange}
              className="input-field"
              required
            >
              <option value="">Select Employee</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>
                  {emp.full_name} ({emp.employee_id})
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              max={format(new Date(), 'yyyy-MM-dd')}
              className="input-field"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="Present"
                  checked={formData.status === 'Present'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <CheckCircle className="w-5 h-5 text-green-600 mr-1" />
                <span className="text-gray-700">Present</span>
              </label>
              
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="Absent"
                  checked={formData.status === 'Absent'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <XCircle className="w-5 h-5 text-red-600 mr-1" />
                <span className="text-gray-700">Absent</span>
              </label>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setFormData({
                  employee_id: '',
                  date: format(new Date(), 'yyyy-MM-dd'),
                  status: 'Present',
                });
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
              {submitting ? 'Marking...' : 'Mark Attendance'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Attendance;
