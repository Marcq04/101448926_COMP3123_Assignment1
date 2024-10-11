const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Employee Controller
const { getEmployees , createEmployee, getEmployeeById, updateEmployee, deleteEmployee } = require('../controllers/employeeController');

// GET all employees
router.get('/', getEmployees);

// POST new employee
router.post('/', [
    check('first_name', 'First name is required').not().isEmpty(),
    check('last_name', 'Last name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('position', 'Position is required').not().isEmpty(),
    check('salary', 'Salary is required').not().isEmpty(),
    check('date_of_joining', 'Date of joining is required').not().isEmpty(),
    check('department', 'Department is required').not().isEmpty()
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, createEmployee);

// GET employee by ID
router.get('/:id', getEmployeeById);

// PUT update employee
router.put('/:id', [
    check('first_name', 'First name is required').not().isEmpty(),
    check('last_name', 'Last name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('position', 'Position is required').not().isEmpty(),
    check('salary', 'Salary is required').not().isEmpty(),
    check('date_of_joining', 'Date of joining is required').not().isEmpty(),
    check('department', 'Department is required').not().isEmpty()
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, updateEmployee);

// DELETE employee
router.delete('/:id', deleteEmployee);

module.exports = router
