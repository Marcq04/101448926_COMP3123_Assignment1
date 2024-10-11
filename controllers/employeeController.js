const Employee = require('../models/employee');

// Create new employee
const createEmployee = async (req, res) => {
    const employee = new Employee(req.body);
    try {
        const savedEmployee = await employee.save();
        res.status(200).json(savedEmployee);
    } 
    catch (err) {
        res.status(500).json(err);
    }
}

// Get all employees
const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } 
    catch (err) {
        res.status(500).json(err);
    }
}

// Get employee by ID
const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        res.status(200).json(employee);
    } 
    catch (err) {
        res.status(500).json(err);
    }
}

// Update employee
const updateEmployee = async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedEmployee);
    } 
    catch (err) {
        res.status(500).json(err);
    }
}

// Delete employee
const deleteEmployee = async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.status(200).json('Employee has been deleted...');
    } 
    catch (err) {
        res.status(500).json(err);
    }
}

module.exports = { createEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee }