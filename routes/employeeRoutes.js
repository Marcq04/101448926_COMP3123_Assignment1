const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Employee Controller
const { getEmployees , createEmployee, getEmployeeById, updateEmployee, deleteEmployee } = require('../controllers/employeeController');

// GET all employees
router.get('/employees', getEmployees);

// POST new employees
router.post('/employees', [
    check('first_name', 'First name is required').not().isEmpty(),
    check('last_name', 'Last name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('position', 'Position is required').not().isEmpty(),
    check('salary', 'Salary is required').not().isEmpty(),
    check('date_of_joining', 'Date of joining is required').not().isEmpty(),
    check('department', 'Department is required').not().isEmpty()
], (req, res, next) => {
    const errors = validationResult(req);
    // If validation fails
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, createEmployee);

// GET, PUT, and DELETE single employee by ID
router.route('/employees/:eid')
    .get(getEmployeeById)
    .put([
        check('first_name', 'First name is required').not().isEmpty(),
        check('last_name', 'Last name is required').not().isEmpty(),
        check('email', 'Email is required').not().isEmpty(),
        check('position', 'Position is required').not().isEmpty(),
        check('salary', 'Salary is required').not().isEmpty(),
        check('date_of_joining', 'Date of joining is required').not().isEmpty(),
        check('department', 'Department is required').not().isEmpty()
    ], (req, res, next) => {
        const errors = validationResult(req);
        // If validation fails
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }, updateEmployee)
    .delete(deleteEmployee);


module.exports = router

