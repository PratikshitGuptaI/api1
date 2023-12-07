const express = require('express');
const router = express.Router();
const sequelize = require('../config/db.js');
const EventController = require('../controllers/eventController');
const eventController = new EventController();
// (sequelize, Sequelize.DataTypes,
//   Sequelize.Model);
// const authenticate = require('../middleware/auth.js');
// router.post('/create', 
// async (req, res) => {
//     try {
//       const { eventName, eventDesciption, eventImgUrl,eventMode,eventVenue,eventType,eventFor,eventUrl,eventDate,eventLocationUrl } = req.body;
  
//       const event = await Event.create({ eventName, eventDesciption, eventImgUrl,eventMode,eventVenue,eventType,eventFor,eventUrl,eventDate,eventLocationUrl });
//       res.status(201).json({ event });
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   }
  // eventController.createRole
  // );
router.get('/list',eventController.getEvents);
router.get('/approved',eventController.getApprovedEvents);
router.get('/published',eventController.getPublishedEvents);

router.get('/speakers',eventController.getSpeakersById)
router.put('/approve',eventController.approveEvent);
router.put('/publish',eventController.publishEvent);
router.put('/finish',eventController.finishEvent);
router.get('/published/:eventId',eventController.getEventById);

router.put('/rate',eventController.rateEvent)
router.get('/',eventController.getEvents);
router.post('/',eventController.createEvent);
router.put('/',eventController.updateEvent);
router.delete('/:eventId',eventController.deleteEvent);
// router.put('/approve/:eventid',async(req,res)=>{

// });

module.exports = router;