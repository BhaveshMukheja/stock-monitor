const express = require('express')
const router = express.Router()
const isLoggedIn = require('../middlewares/isLoggedIn')

const { createTask, updateTask, deleteTask, getTasks } = require('../controllers/taskController')
router.route('/tasks/create').post(isLoggedIn,createTask)
router.route('/tasks/update/:id').put(isLoggedIn, updateTask)
router.route('/tasks/delete/:id').delete(isLoggedIn, deleteTask)
router.route('/tasks/:id').get(isLoggedIn, getTasks)


module.exports = router;