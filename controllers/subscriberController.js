const Subscriber = require('../models/subscriberModel');

exports.getSubscribers = async (req, res) => {
    const subscribers = await Subscriber.find();
    res.render('subscriber/index', {subscribers});
};

exports.newSubscriberForm = (req, res) => {
    res.render('subscriber/new');
};

exports.addSubscriber = async (req, res) => {
    await Subscriber.create(req.body);
    res.redirect('/subscribers');
};

exports.editSubscriberForm = async (req, res) => {
    const subscriber = await Subscriber.findById(req.params.id);
    res.render('subscriber/edit', {subscriber});
};

exports.updateSubscriber = async (req, res) => {
    await Subscriber.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/subscribers');
};

exports.deleteSubscriber = async (req, res) => {
    await Subscriber.findByIdAndDelete(req.params.id);
    res.redirect('/subscribers');
};

exports.getSubscribersJson = async (req, res) => {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
};
