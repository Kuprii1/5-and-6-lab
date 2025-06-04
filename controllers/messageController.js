const Message = require('../models/messageModel');
const Subscriber = require('../models/subscriberModel');

exports.getMessages = async (req, res) => {
    const messages = await Message.find().populate('subscribers');
    res.render('message/index', {messages});
};

exports.newMessageForm = async (req, res) => {
    const subscribers = await Subscriber.find();
    res.render('message/new', {subscribers});
};

exports.addMessage = async (req, res) => {
    await Message.create({
        subject: req.body.subject,
        content: req.body.content,
        sentAt: new Date()
    });
    res.redirect('/');
};
exports.getMessage = async (req, res) => {
    const message = await Message.findById(req.params.id)
    res.render('message/show', {message});
}

exports.editMessageForm = async (req, res) => {
    const message = await Message.findById(req.params.id);
    const subscribers = await Subscriber.find();
    res.render('message/edit', {message, subscribers});
};

exports.updateMessage = async (req, res) => {
    await Message.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/');
};

exports.deleteMessage = async (req, res) => {
    await Message.findByIdAndDelete(req.params.id);
    res.redirect('/');
};

exports.getMessagesJson = async (req, res) => {
    const message = await Message.find().populate('subscribers');
    res.json(message);
};
