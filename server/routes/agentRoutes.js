const express = require('express');
const { createPlan, getAgentStatus } = require('../controllers/agentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect); // All agent routes are protected

router.post('/create-plan', createPlan);
router.get('/status', getAgentStatus);

module.exports = router;
