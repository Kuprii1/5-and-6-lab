const express = require('express');
const router = express.Router();
const subscriberController = require('../controllers/subscriberController');

router.get('/subscribers', subscriberController.getSubscribers);
router.get('/subscribers/new', subscriberController.newSubscriberForm);
router.post('/subscribers/', subscriberController.addSubscriber);
router.get('/subscribers/:id/edit', subscriberController.editSubscriberForm);
router.post('/subscribers/:id/update', subscriberController.updateSubscriber);
router.post('/subscribers/:id/delete', subscriberController.deleteSubscriber);

router.get('/subscribers/api/json', subscriberController.getSubscribersJson);

module.exports = router;
