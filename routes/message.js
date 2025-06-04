const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const subscriberController = require("../controllers/subscriberController");

router.get('/', (req, res) => {
    res.render('welcome');
})
router.get('/messages', messageController.getMessages);
router.get('/messages/new', messageController.newMessageForm);
router.get('/messages/:id', messageController.getMessage);
router.post('/messages', messageController.addMessage);
router.get('/messages/:id/edit', messageController.editMessageForm);
router.post('/messages/:id/update', messageController.updateMessage);
router.post('/messages/:id/delete', messageController.deleteMessage);

router.get('/messages/api/json', messageController.getMessagesJson);

module.exports = router;
