const Queue = require('bull');
const AgentService = require('./agentService');
const Task = require('../models/Task');

// Initialize the automation queue
const automationQueue = new Queue('automation', process.env.REDIS_URL || 'redis://localhost:6379');

// Process jobs
automationQueue.process(async (job) => {
    const { type, data } = job.data;

    switch (type) {
        case 'STUDY_REMINDER':
            console.log(`Sending reminder for task: ${data.taskId}`);
            // Logic for real-time notification via Socket.io will be added later
            break;
        case 'ADAPTIVE_PLANNING':
            console.log(`Re-evaluating plan for user: ${data.userId}`);
            const newPlan = await AgentService.createPlan(data.goal);
            // Update the user's study plan in the database
            break;
        default:
            console.log('Unknown job type');
    }
});

const scheduleTask = async (type, data, delay) => {
    await automationQueue.add({ type, data }, { delay });
};

module.exports = { scheduleTask, automationQueue };
