
import React, { useEffect, useState } from 'react';
import { notify } from '../utils';
import { CreateEmployee, UpdateEmployeeById } from '../api';

function AddEmployee({ showModal, setShowModal, fetchEmployees, employeeObj }) {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        phone: '',
        department: '',
        salary: '',
        profileImage: null
    });
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        if (employeeObj) {
            setEmployee(employeeObj);
            setUpdateMode(true);
        }
    }, [employeeObj]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleFileChange = (e) => {
        setEmployee({ ...employee, profileImage: e.target.files[0] });
    };

    const resetEmployeeStates = () => {
        setEmployee({
            name: '',
            email: '',
            phone: '',
            department: '',
            salary: '',
            profileImage: null,
        });
    };

    const handleAddEmployee = async (e) => {
        e.preventDefault();
        try {
            const { success, message } = updateMode ?
                await UpdateEmployeeById(employee, employee._id)
                : await CreateEmployee(employee);
            if (success) {
                notify(message, 'success');
            } else {
                notify(message, 'error');
            }
            setShowModal(false);
            resetEmployeeStates();
            fetchEmployees();
            setUpdateMode(false);
        } catch (err) {
            console.error(err);
            notify('Failed to create Employee', 'error');
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        setUpdateMode(false);
        resetEmployeeStates();
    };

    return (
        <div style={{
            display: showModal ? 'flex' : 'none',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
            fontFamily: '"Poppins", sans-serif',
        }}>
            {/* Main Container */}
            <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '15px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                padding: '25px',
                width: '90%',
                maxWidth: '500px',
                animation: 'fadeIn 0.8s ease-in-out'
            }}>
                {/* Card Header */}
                <div style={{
                    backgroundColor: '#2575fc',
                    color: '#ffffff',
                    padding: '15px',
                    borderRadius: '10px 10px 0 0',
                    textAlign: 'center',
                    marginBottom: '20px'
                }}>
                    <h2 style={{ margin: 0 }}>{updateMode ? 'Update Employee' : 'Add Employee'}</h2>
                </div>

                {/* Card Body */}
                <div style={{ padding: '20px' }}>
                    <form onSubmit={handleAddEmployee}>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', color: '#2c3e50' }}>Name</label>
                            <input
                                type="text"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                    fontSize: '16px'
                                }}
                                name="name"
                                value={employee.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', color: '#2c3e50' }}>Email</label>
                            <input
                                type="email"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                    fontSize: '16px'
                                }}
                                name="email"
                                value={employee.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', color: '#2c3e50' }}>Phone</label>
                            <input
                                type="text"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                    fontSize: '16px'
                                }}
                                name="phone"
                                value={employee.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', color: '#2c3e50' }}>Department</label>
                            <input
                                type="text"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                    fontSize: '16px'
                                }}
                                name="department"
                                value={employee.department}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', color: '#2c3e50' }}>Salary</label>
                            <input
                                type="text"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                    fontSize: '16px'
                                }}
                                name="salary"
                                value={employee.salary}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', color: '#2c3e50' }}>Profile Image</label>
                            <input
                                type="file"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                    fontSize: '16px'
                                }}
                                name="profileImage"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <button
                                type="submit"
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
                                onMouseOver={(e) => {
                                    e.target.style.backgroundColor = '#6a11cb';
                                    e.target.style.transform = 'scale(1.05)';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.backgroundColor = '#2575fc';
                                    e.target.style.transform = 'scale(1)';
                                }}
                            >
                                {updateMode ? 'Update' : 'Save'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

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
                `}
            </style>
        </div>
    );
}

export default AddEmployee;