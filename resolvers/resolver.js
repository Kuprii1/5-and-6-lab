const Subscriber = require('../models/subscriberModel');
const Message = require('../models/messageModel');

module.exports = {
    Query: {
        getSubscribers: async () => {
            const subs = await Subscriber.find();
            return subs.map(s => ({
                ...s.toObject(),
                id: s._id.toString(),
            }));
        },
        getSubscriber: async (_, {id}) => {
            const s = await Subscriber.findById(id);
            if (!s) return null;
            return {
                ...s.toObject(),
                id: s._id.toString(),
            };
        },
        getMessages: async () => {
            const msgs = await Message.find().populate('subscribers');
            return msgs.map(m => ({
                ...m.toObject(),
                id: m._id.toString(),
                subscribers: m.subscribers.map(sub => ({
                    ...sub.toObject(),
                    id: sub._id.toString(),
                })),
            }));
        },
        getMessage: async (_, {id}) => {
            const m = await Message.findById(id).populate('subscribers');
            if (!m) return null;
            return {
                ...m.toObject(),
                id: m._id.toString(),
                subscribers: m.subscribers.map(sub => ({
                    ...sub.toObject(),
                    id: sub._id.toString(),
                })),
            };
        },
    },
    Mutation: {
        addSubscriber: async (_, args) => {
            const s = await Subscriber.create(args);
            return {
                ...s.toObject(),
                id: s._id.toString(),
            };
        },
        updateSubscriber: async (_, {id, ...updates}) => {
            const s = await Subscriber.findByIdAndUpdate(id, updates, {new: true});
            if (!s) return null;
            return {
                ...s.toObject(),
                id: s._id.toString(),
            };
        },
        deleteSubscriber: async (_, {id}) => {
            await Subscriber.findByIdAndDelete(id);
            return "Subscriber deleted";
        },

        addMessage: async (_, {subject, content, sentAt, subscriberIds}) => {
            const msg = await Message.create({subject, content, sentAt, subscribers: subscriberIds});
            await msg.populate('subscribers');
            return {
                ...msg.toObject(),
                id: msg._id.toString(),
                subscribers: msg.subscribers.map(sub => ({
                    ...sub.toObject(),
                    id: sub._id.toString(),
                })),
            };
        },
        updateMessage: async (_, {id, ...updates}) => {
            const msg = await Message.findByIdAndUpdate(id, updates, {new: true}).populate('subscribers');
            if (!msg) return null;
            return {
                ...msg.toObject(),
                id: msg._id.toString(),
                subscribers: msg.subscribers.map(sub => ({
                    ...sub.toObject(),
                    id: sub._id.toString(),
                })),
            };
        },
        deleteMessage: async (_, {id}) => {
            await Message.findByIdAndDelete(id);
            return "Message deleted";
        },
    },
};
