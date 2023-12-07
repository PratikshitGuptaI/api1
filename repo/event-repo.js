"use strict";
const sequelize = require('../config/db.js');
const Event = sequelize.Event;
const { Op,Sequelize } = require('sequelize');
class EventRepo{
  
  //get all events
  //get event by name
  //get event by id
  //get top1(latest) event
  //get top 3 event
  //create event 
  //update event
  //delete event
  //approve event
  //publish event
  async getSpeakersById(id){
    const event_days = await sequelize.EventDays.findAll({
      where:{
        event_id:id
      },
      include:{
        model:sequelize.EventSpeakers
      }
    })
    return event_days;
  }
  async getApprovedEvents(){
    const list = await Event.findAll({
      where:{
        is_approved:0
      }
    });
    return list;
  }
  async getPublishedEvents(){
    const list = await Event.findAll({
      where:{
        is_published:1,
        // event_date: {
        //   [Op.gte]: Sequelize.literal('CURDATE()'), // greater than or equal to today
        // },
    
      },
    });
    if(list.length !=  0){
      const formattedEvents = list.map(item => ({
        ...item.dataValues,
        id: item.id,
        title: item.name,
        value: item.id,
      }));
      return formattedEvents;
    }
    else{
      return list
    }
    
    // include:{
    //   model: sequelize.EventDays
    // }
  }
  async getEvents(){
      const roles = await Event.findAll();
      if(roles.length !=  0){
        const formattedRoles = roles.map(item => ({
          id: item.id,
          title: item.name,
          value: item.id,
          ...item.dataValues,
        }));
        return formattedRoles;
      }
      else{
        return 'No Events Found';
      }
  }
  async getEventByName(name){
    const event = await Event.findAll({where:{name:name}})
    return event;
  }
  async getEventById(id){
    const event = await Event.findOne({where:{id:id},include:{
      model:sequelize.EventDays,
      include:[{
        model:sequelize.EventSpeakers
      }]
    }})
      return event;
  }
  async getSpeakersById(id){
    const Speakers = await sequelize.EventSpeakers.findAll({
      where:{id:id}
    })
    return Speakers;
  }
  async createEvent(req,res){
      // const {name,label,report_to,status,created_by,modified_by} = req.body;
      // const allowedFields = ['event_title', 'description', 'event_image','event_date','event_time'
      // ,'event_venue','geo_link','no_of_days','category','event_type','price','no_of_ticket','max_ticket','is_vendor','is_approved'
      // ,'is_published','gst_available','terms_n_condition','contact_details','created_by','updated_by','execution_points','comment']; 
      // List the fields you want to allow
     
      const excludedKeys = ['id'];
      // const excludedKeys = ['id', 'created_at', 'updated_at'];
      const allowedFields = await Object.keys(Event.getAttributes()).filter(allowedFields => !excludedKeys.includes(allowedFields));
      const eventDaysAndSpeakers = req.body.event_days_and_speakers;
      const sanitizedData = {};
      for (const key of allowedFields) {
        if (req.body[key] !== undefined) {
          sanitizedData[key] = req.body[key];
        }
      }
      // console.log(sanitizedData);
      const event = await Event.create(sanitizedData).then((event_data)=>{
        Promise.all(
          eventDaysAndSpeakers.map((eventData) =>
            sequelize.EventDays.create({
              event_id:event_data.id,
              speakers_date: eventData.date,
              speakers_day:4,
            }).then((createdEventDay) =>
            sequelize.EventSpeakers.bulkCreate(
                eventData.speakersDetail.map((speaker) => ({
                  day_id: createdEventDay.id,
                  speaker_name: speaker.name,
                  // speaker_image:'https://www.forbesindia.com/media/images/2022/Jan/img_175859_samirmodicolorbar.jpg',
                  speaker_image:speaker.speaker_image,
                  speaker_description: speaker.description,
                  speaker_time: speaker.fromtime + '-' + speaker.timeto,
                  created_by:1,
                  updated_by:1
                  // ... other speaker fields
                }))
              )
            )
          )
        )
          .then(() => {
            // Handle success
            return { message: 'Events and speakers created successfully' };
          })
          .catch((error) => {
            // Handle errors
            console.error(error);
            return { error: 'Internal server error' };
            // return res.status(500).json({ error: 'Internal server error' });
          });
      });
    // const day_id=0;
    // const daysnspeakers = req.body.event_days_and_speakers;
    // const daysList = [];
    // const speakersList = [];
    // const event_id = 1
    // const days = daysnspeakers.map((e)=>{daysList.push([event_id,new Date(e.date).getDay(),e.date])});
    // const speakers = daysnspeakers.map((e)=>{speakersList.push(e.speakersDetail)});
    // const daysjson =daysList.map(row => Object.assign(...row.map((j, i, v) => ({ event_id: event_id,speakers_day:i,speakers_date:j}))));
    // const speakersjson =daysList.map(row => Object.assign(...row.map((j, i, v) => ({ day_id: event_id,speakers_name:j[0],speakers_image:j,speaker_description:j[2],speaker_time:v[1],created_by:1,updated_by:1}))));
    
    // const daysCreation = await sequelize.EventDays.bulkCreate(
    //   daysjson, { individualHooks: true,transaction }
    //   );
    //   const speakersData = daysCreation.map(days => {
    //     return { speakersList/* attributes for RelatedModel, including MainModel's ID */ };
    //   });
    //   await sequelize.EventSpeakers.bulkCreate(relatedModelsData, { transaction });

    //   // Commit the transaction
    //   await transaction.commit();
      // let json = daysnspeakers.map(row => Object.assign(...row.map((j, i, v) => ({ day_id: days_id, module_id: v[0], action_id: j }))));
      // const speakers = await sequelize.EventSpeakers.bulkCreate(json, { individualHooks: true } );
    // return speakersjson;
    // return daysjson;
    // return speakersList;
    // return daysList;
    // //  return allowedFields;
    //  return event;
    }
  async updateEvent(id){
      const {name,label,report_to,status,created_by,modified_by} = req.body;
      const role = await Event.update({
        name,label,report_to,status,created_by,modified_by
      }, {
        where: {
          id: id,
        },
      });
      return ({ role });
  }
  async updateRating(req){
      const execution_points = req.body.execution_points
      const comments = req.body.comments
      const eventId = req.body.eventId
      const role = await Event.update({
        execution_points,comments
      }, {
        where: {
          id: eventId,
        },
      });
      return ({ role });
  }
  async deleteEvent(eventId){
      const event = await Event.destroy({
        where: { id: eventId 
        }
      })
      return ({result: event });
  }
  async approveEvent(id){
    const event = await Event.update({
      is_approved:1
    },{
      where:{
        id:id
      }
    })
    return event;
  }
  async finishEvent(id){
    const event = await Event.update({
      is_finished:1
    },{
      where:{
        id:id
      }
    })
    return event;
  }
  async publishEvent(id,comments){
    const event = await Event.update({
      is_published:1,
      is_approved:1,
      comment:comments
    },{
      where:{
        id:id
      }
    })
    return event;
  }
}
module.exports = EventRepo;