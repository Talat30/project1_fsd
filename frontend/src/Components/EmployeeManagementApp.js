
import React, { useEffect, useState } from 'react';
import EmployeeTable from './EmployeeTable';
import AddEmployee from './AddEmployee';
import { GetAllEmployees } from '../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeManagementApp = () => {
    const [showModal, setShowModal] = useState(false);
    const [employeeObj, setEmployeeObj] = useState(null);
    const [employeesData, setEmployeesData] = useState({
        employees: [],
        pagination: {
            currentPage: 1,
            pageSize: 5,
            totalEmployees: 0,
            totalPages: 0
        }
    });

    const fetchEmployees = async (search = '', page = 1, limit = 5) => {
        console.log('Called fetchEmployees');
        try {
            const data = await GetAllEmployees(search, page, limit);
            console.log(data);
            setEmployeesData(data);
        } catch (err) {
            toast.error('Failed to fetch employees. Please try again.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
            });
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleSearch = (e) => {
        fetchEmployees(e.target.value);
    };

    const handleUpdateEmployee = async (emp) => {
        setEmployeeObj(emp);
        setShowModal(true);
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#e9ecef',
            fontFamily: '"Poppins", sans-serif',
            padding: '20px'
        }}>
            {/* Main Container */}
            <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '15px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                padding: '25px',
                width: '90%',
                maxWidth: '1200px',
                animation: 'fadeIn 0.8s ease-in-out'
            }}>
                {/* Enhanced Heading */}
                <h1 style={{
                    fontSize: '2.5rem',
                    fontWeight: '600',
                    color: '#2c3e50',
                    textAlign: 'center',
                    marginBottom: '25px',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    background: 'linear-gradient(90deg, #6a11cb, #2575fc)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    borderBottom: '3px solid #2575fc',
                    paddingBottom: '10px',
                    display: 'inline-block',
                    margin: '0 auto 30px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    padding: '15px 30px',
                    borderRadius: '10px',
                    animation: 'slideIn 0.8s ease-in-out'
                }}>
                    Employee Management System
                </h1>

                {/* Search and Add Button Section */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '25px'
                }}>
                    <button
                        style={{
                            backgroundColor: '#2575fc',
                            color: '#ffffff',
                            border: 'none',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: '500',
                            transition: 'background-color 0.3s ease, transform 0.2s ease',
                            boxShadow: '0 4px 6px rgba(37, 117, 252, 0.2)'
                        }}
                        onClick={() => {
                            setShowModal(true);
                            setEmployeeObj(null); // Reset employee object when adding a new employee
                        }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#6a11cb';
                            e.target.style.transform = 'scale(1.05)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = '#2575fc';
                            e.target.style.transform = 'scale(1)';
                        }}
                    >
                        Add Employee
                    </button>
                    <input
                        onChange={handleSearch}
                        type="text"
                        placeholder="Search Employees..."
                        style={{
                            width: '50%',
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                            fontSize: '16px',
                            outline: 'none',
                            transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#2575fc';
                            e.target.style.boxShadow = '0 2px 8px rgba(37, 117, 252, 0.2)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = '#ddd';
                            e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                        }}
                    />
                </div>

                {/* Employee Table */}
                <EmployeeTable
                    employees={employeesData.employees}
                    pagination={employeesData.pagination}
                    fetchEmployees={fetchEmployees}
                    handleUpdateEmployee={handleUpdateEmployee}
                />

                {/* Add/Edit Employee Modal */}
                <AddEmployee
                    fetchEmployees={fetchEmployees}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    employeeObj={employeeObj}
                />
            </div>

            {/* Toast Notifications */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            {/* Global Styles for Animations */}
            <style>
                {`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                `}
            </style>
        </div>
    );
};

export default EmployeeManagementApp;