const sequelize = require('../config/db.js');
const Ticket = sequelize.BookingTickets;

class ticketRepo{
    async scanTicket(id){
        const list = await Ticket.update();
        return list;
    }
    async updateAttendance(sku){
        const attendance = await Ticket.update({
            attendance: 1,
        },
        {
            where:{
                sku : sku
            }

        })
        return attendance
    }
    async ticketsListByBookingId(id){
        const list = await Ticket.findAll({
            where:{
                booking_id: id
            }
        })
        return list;
    }
}

module.exports = ticketRepo;