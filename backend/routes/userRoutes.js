const express = require('express');
const router = express.Router();
const { getUsers, getUserById, deleteUser, getAnalytics } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', protect, authorize('admin'), getUsers);
router.get('/analytics', protect, authorize('admin'), getAnalytics);
router.get('/:id', protect, authorize('admin'), getUserById);
router.delete('/:id', protect, authorize('admin'), deleteUser);

module.exports = router;
