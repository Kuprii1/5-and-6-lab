const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    sentAt: {
        type: Date,
        required: true,
    },
    subscribers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Subscriber'}]
});

module.exports = mongoose.model('Message', messageSchema);
