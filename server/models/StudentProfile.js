const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    goals: [String],
    interests: [String],
    learningStyle: {
        type: String,
        enum: ['visual', 'auditory', 'reading', 'kinesthetic'],
        default: 'reading',
    },
    preferredLanguage: {
        type: String,
        default: 'English',
    },
    aiPersonality: {
        type: String,
        default: 'Friendly',
    },
    studyPlan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StudyPlan',
    },
    progress: {
        totalStudyTime: { type: Number, default: 0 },
        completedTasks: { type: Number, default: 0 },
        skillGraph: {
            type: Map,
            of: Number,
        },
    },
});

module.exports = mongoose.model('StudentProfile', studentProfileSchema);
