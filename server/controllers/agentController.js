const agentService = require('../services/agentService');
const StudyPlan = require('../models/StudyPlan');

// @desc    Create a study plan using AI
// @route   POST /api/agent/create-plan
// @access  Private
exports.createPlan = async (req, res, next) => {
    try {
        const { goal } = req.body;

        if (!goal) {
            return res.status(400).json({ success: false, error: 'Please provide a goal' });
        }

        const aiPlan = await agentService.createPlan(goal);

        // In a real app, parse aiPlan into steps and save to DB
        const plan = await StudyPlan.create({
            user: req.user.id,
            goal,
            steps: [{ title: 'Initial Plan Generated', description: aiPlan }]
        });

        res.status(200).json({
            success: true,
            data: plan
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Get AI Chat response
// @route   POST /api/agent/chat
// @access  Private
exports.chat = async (req, res, next) => {
    try {
        const { message, isSystem } = req.body;

        if (!message) {
            return res.status(400).json({ success: false, error: 'Please provide a message' });
        }

        const aiResponse = await agentService.getChatResponse(message, isSystem);

        res.status(200).json({
            success: true,
            data: aiResponse
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Get AI Agent status
// @route   GET /api/agent/status
// @access  Private
exports.getAgentStatus = async (req, res, next) => {
    res.status(200).json({
        success: true,
        status: 'online',
        agents: [
            { name: 'Study Planner', active: true },
            { name: 'Notes Generator', active: true },
            { name: 'Exam Revision', active: false }
        ]
    });
};
