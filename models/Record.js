const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
    bodyTemperature: {
        type: Number,
        required: [false, 'Please add Body Temperature']
    },
    pulseRate:{
        type: Number,
        required: [false, 'Please add pulse rate']
    },

    respirationRate: {
        type: Number,
        required: [false, 'Please add respiration rate']
    },
    systolicBP:{
        type: Number,
        required: [false, 'Please add systolic bp']
    },
    diastolicBP:{
        type: Number,
        required: [false, 'Please add diastolic bp']
    },

    o2Sat: {
        type: Number,
        required: [false, 'Please add oxygen saturation']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    patient: {
        type: mongoose.Schema.ObjectId,
        ref: 'Patient',
        required: true
    }
});

module.exports = mongoose.model('Record', RecordSchema);