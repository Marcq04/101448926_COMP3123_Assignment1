const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    position: { type: String, required: true },
    salary: { type: Number, required: true },
    date_of_joining: { type: Date, required: true },
    department: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

// Middleware to update the 'updated_at' field
employeeSchema.pre('save', function(next) {
    const employee = this;
    employee.updated_at = Date.now();
    next();
});

const Employee = mongoose.model('Employee', employeeSchema);

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
        const employee = await Employee.findById(req.params.eid); // Change req.params.id to req.params.eid
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error fetching employee by ID' });
    }
};

// Update employee by ID
const updateEmployee = async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.eid, { $set: req.body }, { new: true }); // Change req.params.id to req.params.eid
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(updatedEmployee);
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error updating employee' });
    }
};

// Delete employee by ID
const deleteEmployee = async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.eid); // Change req.params.id to req.params.eid
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted successfully' });
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error deleting employee' });
    }
};


module.exports = { createEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee };
