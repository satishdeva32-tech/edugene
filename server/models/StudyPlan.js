const mongoose = require('mongoose');

const studyPlanSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    goal: {
        type: String,
        required: true,
    },
    steps: [{
        title: String,
        description: String,
        completed: { type: Boolean, default: false }
    }],
    status: {
        type: String,
        enum: ['active', 'completed', 'archived'],
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('StudyPlan', studyPlanSchema);
