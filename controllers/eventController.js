const sequelize= require('../config/db');
const EventRepo = require('../repo/event-repo');
const eventrepo = new EventRepo();
const RoleRepo = require('../repo/role-repo');
const rolerepo = new RoleRepo();
const Event = sequelize.Event;
const User = sequelize.User;

class EventController  {
  
    async approveEvent(req,res){
      const eventId = req.body.eventId;
      const event = await eventrepo.approveEvent(eventId);
      if(!event){
        return res.status(200).json({result:event});
      }
      else{
        return res.status(200).json({result:'No Event to Approve'});
      }
      // const permitted = await eventrepo.approveEvent(eventId);
      // if(permitted){
      //   const event = await Event.update({is_approved:1}, {
      //     where: {
      //       id: eventId,
      //     },
      //   });
      // }
      // else{
      //   return res.status(200).json({result:'User Not Accessed.'});
      // }
    }
    async publishEvent(req,res){
      const eventId = req.body.eventId;
      const comment = req.body.comments;
      const event = await eventrepo.publishEvent(eventId,comment);
      // if(!event){
        return res.status(200).json({result:event});
        
      //   }
      // else{
      //   return res.status(200).json({result:'Event Not Published.'});
      // }
    }
    async finishEvent(req,res){
      const eventId = req.body.eventId;
      const event = await eventrepo.finishEvent(eventId);
      // if(!event){
        return res.status(200).json({result:event});
        
      //   }
      // else{
      //   return res.status(200).json({result:'Event Not Published.'});
      // }
    }
    async getApprovedEvents(req,res){
      try{
        const events = await eventrepo.getApprovedEvents();
        if(!events || events.length == 0){
          return res.status(200).json({result:'No Approved Events Found'});
        }
        else{
          return res.status(200).json({result:events});
        }

      }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
        res.status(400).json({ message: error.message });
      }
    }
    async getPublishedEvents(req,res){
      try{
        const events = await eventrepo.getPublishedEvents();
        if(!events || events.length == 0){
          return res.status(200).json({result:'',status:0});
        }
        else{
          return res.status(200).json({result:events,status:1});
        }

      }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
        res.status(400).json({ message: error.message });
      }
    }
    async getEvents(req,res){
      try{
      const events = await eventrepo.getEvents();
      if(!events){
        return res.status(200).json({result:'No Events Found'});
      }
      else{
        return res.status(200).json({result:events});
      }
    }
    catch(error){
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
      res.status(400).json({ message: error.message });
    }
    };
    async createEvent(req,res){
      try{
        const event = await eventrepo.createEvent(req);
        if(!event){
          return res.status(200).json({result:'Could Not Create Event'});
        }
        else{
          return res.status(200).json({result:event});
        }
      }
      catch(error){
        console.error(error);
        // res.status(500).json({ error: 'Internal Server Error' });
        res.status(400).json({ message: error.message });
      }
    }
    async updateEvent(req,res){
      try{
        const eventId = req.body.eventId;
        
        const event = await eventrepo.updateEvent(req.body);
        // const items = await invoicerepo.getInvoiceItems(InvoiceId);
        if(!event || event.length ==0){
          return res.status(200).json({result:'No Event Found with EventId of '+eventId});
        }
        else{
            return res.status(200).json({result:event});
          }
        }
        catch(error){
          console.error(error);
          res.status(400).json({ message: error.message });
        }
    }
    async deleteEvent(req,res){
      const eventId = req.params.eventId;
        const role = await eventrepo.deleteEvent(eventId);
        return res.status(200).json(role);
    }
    async rateEvent(req,res){
        const role = await eventrepo.updateRating(req);
        return res.status(200).json(role);
    }
    async getEventByName(req,res){
      const name = req.body.name;
      const role = await eventrepo.getEventByName(name);
      return res.status(201).json(role);
    }
    async getEventById(req,res){
      try{
        const eventId = req.params.eventId;
        const event = await eventrepo.getEventById(eventId);
        if(!event){
          return res.status(201).json({result:'No Event Found'});
        }
        else{
          return res.status(201).json({result:event});
        }
      }catch(error){
        console.error(error);
        // res.status(500).json({ error: 'Internal Server Error' });
        res.status(400).json({ message: error.message });
      }
    }
    async getSpeakersById(req,res){
      try{
        const eventId = req.params.eventId;
        const speakers = await eventrepo.getEventById(eventId);
        if(!speakers){
          return res.status(201).json({result:'No Speakers Found'});
        }
        else{
          return res.status(201).json({result:speakers});
        }
      }catch(error){
        console.error(error);
        // res.status(500).json({ error: 'Internal Server Error' });
        return res.status(400).json({ message: error.message });
      }
    }
}

module.exports = EventController