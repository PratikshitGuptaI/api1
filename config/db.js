const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'mysql-2b50ce2c-channelharsh4561-4503.a.aivencloud.com',
  port: 25443,
  username: 'avnadmin',
  password: 'AVNS_I90wTe5rRVB6oDNTCzM',
  database: 'modievents',
});
// const sequelize = new Sequelize('modievents', 'root', 'root', {
//   host: 'localhost',
//   dialect: 'mysql',
// });
const Modules = require('../models/modules')(sequelize, Sequelize.DataTypes);
const User = require('../models/user')(sequelize, Sequelize.DataTypes);

const ModuleActions = require('../models/module_actions')(sequelize, Sequelize.DataTypes);

const Roles = require('../models/roles')(sequelize, Sequelize.DataTypes);
const RolePermissions = require('../models/role_permissions')(sequelize, Sequelize.DataTypes);

const Event = require('../models/event')(sequelize,Sequelize.DataTypes);
const EventDays = require('../models/event_days')(sequelize,Sequelize.DataTypes);
const EventSpeakers = require('../models/event_speakers')(sequelize,Sequelize.DataTypes);
const EventAttendance = require('../models/event_attendance')(sequelize,Sequelize.DataTypes);

const OfferRules = require('../models/offer_rules')(sequelize,Sequelize.DataTypes);

const Invoices = require('../models/invoices')(sequelize,Sequelize.DataTypes);
const InvoiceItems = require('../models/invoice_items')(sequelize,Sequelize.DataTypes);

// const Cart = require('../models/cart')(sequelize,Sequelize.DataTypes);
// const CartPayment = require('../models/cart_payment')(sequelize,Sequelize.DataTypes);

const Booking = require('../models/booking')(sequelize,Sequelize.DataTypes);
const BookingTickets = require('../models/booking_tickets')(sequelize,Sequelize.DataTypes);
const BookingPayment = require('../models/booking_payment')(sequelize,Sequelize.DataTypes);
const BookingTransaction = require('../models/booking_transactions')(sequelize,Sequelize.DataTypes);

const VendorPayment = require('../models/vendor_payments')(sequelize,Sequelize.DataTypes);
const HomeBanners = require('../models/home_banners')(sequelize,Sequelize.DataTypes);
const HomeBottomSection = require('../models/home_bottom_section')(sequelize,Sequelize.DataTypes);

const Devices = require('../models/devices')(sequelize,Sequelize.DataTypes);
// Associate models
console.log('Starting association setup...');
Modules.associate({ ModuleActions, RolePermissions });
ModuleActions.associate({ Modules , RolePermissions });
User.associate({Roles,RolePermissions});
Roles.associate({User,RolePermissions });
RolePermissions.associate({ User,Roles ,Modules ,ModuleActions });

Event.associate({EventDays,Invoices,Booking});
EventDays.associate({Event,EventSpeakers})
EventSpeakers.associate({EventDays});
EventAttendance.associate({Event});

Booking.associate({Event,BookingPayment,BookingTransaction,BookingTickets});
BookingPayment.associate({Booking});
BookingTransaction.associate({Invoices,Booking});
BookingTickets.associate({Booking});

Invoices.associate({Event,Booking,BookingTransaction,InvoiceItems});
InvoiceItems.associate({Invoices});
console.log('Finished Association!');
sequelize.sync()
  .then(() => {
    console.log('Database synced successfully');
    // Now you can start your application
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

// Export your models or sequelize instance as needed
module.exports = {
  Devices,
   Modules ,
   ModuleActions , 
   Roles ,
   RolePermissions ,
   User ,
   Event ,
   EventDays,
   EventSpeakers,
   OfferRules,
   Invoices,
   InvoiceItems,
   Booking,
   BookingTickets,
   BookingPayment,
   BookingTransaction,
   HomeBanners,
   HomeBottomSection,
   VendorPayment,
   sequelize 
  };