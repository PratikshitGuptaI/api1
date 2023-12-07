const sequelize = require('../config/db')
const Payment = sequelize.Booking
const fs = require('fs');
const path = require('path');
const qr = require('qr-image');
const { sendEmail } = require('../middleware/emailUtils');
class paymentRepo {
  async createPayment(req) {
    const excludedKeys = ['id', 'customer_vat_id', 'cart_id', 'created_at', 'updated_at'];
    // const excludedKeys = ['id', 'created_at', 'updated_at'];
    const allowedFields = await Object.keys(Payment.getAttributes()).filter(allowedFields => !excludedKeys.includes(allowedFields));
    // const eventDaysAndSpeakers = req.body.event_days_and_speakers;
    // const randomSixDigitNumber =  Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
    // const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // const randomIndex = Math.floor(Math.random() * alphabets.length);
    // const randomAlphabet = alphabets.charAt(randomIndex);


    const sanitizedData = {};
    for (const key of allowedFields) {
      if (req.body[key] !== undefined) {
        sanitizedData[key] = req.body[key];
      }
    }
    const increment_id = 'ME893';
    // const increment_id =  randomAlphabet+randomSixDigitNumber
    sanitizedData['increment_id'] = increment_id
    let booking_id = 1; 
    // console.log(sanitizedData);
    const payment = await Payment.create(sanitizedData).then((booking) => {
      booking_id =booking.id
      createBookingPayment(booking).then((booking_payment) => createBookingTransaction(booking, booking_payment).then(
        (transaction) => {
          if (booking_payment.method_title == 'FREE') {
            createInvoices(booking, booking_payment,transaction).then(createBookingTickets(booking, booking_payment, transaction))
          }
          else{

          }

        }
      )).finally();
    });
    async function createBookingPayment(booking) {
      try {
        const bookingPayment = await sequelize.BookingPayment.create({ method: 'FREE', method_title: 'FREE', booking_id: booking.id, additional: null })
        return bookingPayment;
      } catch (error) {
        console.log(error);
      }
    }
    async function createBookingTransaction(booking, booking_payment) {
      try {
        const bookingTransaction = await sequelize.BookingTransaction.create({ transaction_id: 'FREE', status: 'PAID', type: 'FREE', payment_method: 'FREE', data: 'PAYMENT SUCCESSFUL', invoice_id: '122839', booking_id: booking.id, amount: booking.grand_total })

        return bookingTransaction;
      } catch (error) {
        console.log(error);
      }
    }
    async function createInvoices(booking, booking_payment,transaction) {
      const invoices = await sequelize.Invoices.create({ increment_id: 'MEI231',event_id:booking.event_id,email_sent:0,total_qty:booking.total_qty_ordered,sub_total:booking.sub_total,grand_total:booking.grand_total,tax_amount:0,discount_amount:0,booking_id:booking.id,transaction_id:transaction.id,reminders:0 })
      return invoices;
    }
    async function createBookingTickets(booking, booking_payment, transaction) {
      try {
        const tickets = [];
        for (let i = 0; i < booking.total_qty_ordered; i++) {
          const sku = generateRandomSKU(); // Implement a function to generate a random SKU
          const ticket = await sequelize.BookingTickets.create({ sku: sku, coupon_code: '', qty_ordered: booking.total_qty_ordered, qty_invoiced: booking.total_qty_ordered,qty_canceled:0,qty_refunded:0,price:booking.sub_total,total:booking.grand_total,total_invoiced:booking.grand_total,amount_refunded:0,discount_percent:0,discount_amount:0,discount_invoiced:0,discount_refunded:0,tax_percent:0,tax_amount:0,tax_amount_invoiced:0,tax_amount_refunded:0,booking_id:booking.id,parent_id:1,additional:'',attendance:0});
          tickets.push(ticket);
        }
        generateQRCodes(tickets, booking.id);
        const mail = await sendEmail(booking.customer_email,
          'Your Tickets','',
          `<!DOCTYPE html>
          <html>
          <head>
          <title></title>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <style type="text/css">
          
          body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
          table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
          img { -ms-interpolation-mode: bicubic; }
          
          img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
          table { border-collapse: collapse !important; }
          body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
          
          
          a[x-apple-data-detectors] {
              color: inherit !important;
              text-decoration: none !important;
              font-size: inherit !important;
              font-family: inherit !important;
              font-weight: inherit !important;
              line-height: inherit !important;
          }
          
          @media screen and (max-width: 480px) {
              .mobile-hide {
                  display: none !important;
              }
              .mobile-center {
                  text-align: center !important;
              }
          }
          div[style*="margin: 16px 0;"] { margin: 0 !important; }
          </style>
          <body style="margin: 0 !important; padding: 0 !important; background-color: #eeeeee;" bgcolor="#eeeeee">
          
          
          <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Open Sans, Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
          For what reason would it be advisable for me to think about business content? That might be little bit risky to have crew member like them. 
          </div>
          
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                  <td align="center" style="background-color: #eeeeee;" bgcolor="#eeeeee">
                  
                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                      <tr>
                          <td align="center" valign="top" style="font-size:0; padding: 35px; padding: 40px;   background-image: url(https://media.tenor.com/Jl_Yk1pkxn4AAAAC/event-added-animated.gif);
      height: 250px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;" bgcolor="#F44336">
                         
                          <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;">
                              <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                                  <tr>
                                      <td align="center" valign="bottom" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 48px;height:100%" class="mobile-center">
                                      </td>
                                  </tr>
                              </table>
                          </div>
                          
                          <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;" class="mobile-hide">
                              <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                                  <tr>
                                      <td align="right" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 48px;">
                                          <table cellspacing="0" cellpadding="0" border="0" align="right">
                                              <tr>
                                                  <td style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400;">
                                                      <p style="font-size: 18px; font-weight: 400; margin: 0; color: #ffffff;"><a href="#" target="_blank" style="color: #ffffff; text-decoration: none;">Buy More Tickets &nbsp;</a></p>
                                                  </td>
                                                  <td style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 24px;">
                                                      <a href="#" target="_blank" style="color: #ffffff; text-decoration: none;"><img src="https://img.icons8.com/color/48/000000/small-business.png" width="27" height="23" style="display: block; border: 0px;"/></a>
                                                  </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table>
                          </div>
                        
                          </td>
                      </tr>
                      <tr>
                          <td align="center" style="padding: 35px 35px 20px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                          <tr>
                          <td align="center">
                              
                                  <h1 style="font-size: 36px; font-weight: 800; margin: 0; color: #333333;">ModiEvents</h1>
                          </td>
                      </tr>
                      </table>
                          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                              <tr>
                                  <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;">
                                      <img src="https://img.icons8.com/carbon-copy/100/000000/checked-checkbox.png" width="125" height="120" style="display: block; border: 0px;" /><br>
                                      <h2 style="font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;">
                                          Thank You For Ordering Tickets!
                                      </h2>
                                  </td>
                              </tr>
                              <tr>
                                  <td align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 10px;">
                                      <p style="font-size: 16px; font-weight: 400; line-height: 24px; color: #777777;">
                                          As we gear up for the big day, we want to assure you that every detail is being meticulously taken care of to ensure a seamless and enjoyable event for you and all our guests.
                                      </p>
                                  </td>
                              </tr>
                              <tr>
                                  <td align="left" style="padding-top: 20px;">
                                      <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                          <tr>
                                              <td width="75%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                                  Order Confirmation # ${booking.total_qty_ordered} Tickets
                                              </td>
                                              <td width="25%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                                  ${booking.id}
                                              </td>
                                          </tr>
                                          <tr>
                                              <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">
                                                  Purchased Item (${booking.total_qty_ordered})
                                              </td>
                                              <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">
                                              Rs.${booking.sub_total}
                                              </td>
                                          </tr>
                                         
                                          <tr>
                                              <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                  Tax
                                              </td>
                                              <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                  Rs.0.00
                                              </td>
                                          </tr>
                                      </table>
                                  </td>
                              </tr>
                              <tr>
                                  <td align="left" style="padding-top: 20px;">
                                      <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                          <tr>
                                              <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">
                                                  TOTAL
                                              </td>
                                              <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">
                                              Rs.${booking.sub_total}
                                              </td>
                                          </tr>
                                      </table>
                                  </td>
                              </tr>
                          </table>
                          
                          </td>
                      </tr>
                       <tr>
                          <td align="center" height="100%" valign="top" width="100%" style="padding: 0 35px 35px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:660px;">
                              <tr>
                                  <td align="center" valign="top" style="font-size:0;">
                                      <div style="display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;">
          
                                          <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                                              <tr>
                                                  <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                                                      <p style="font-weight: 800;">Venue Address</p>
                                                      <p>675 Massachusetts Avenue<br>11th Floor<br>Cambridge, MA 02139</p>
          
                                                  </td>
                                              </tr>
                                          </table>
                                      </div>
                                      <div style="display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;">
                                          <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                                              <tr>
                                                  <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                                                      <p style="font-weight: 800;">Event Date</p>
                                                      <p>January 1st, 2024</p>
                                                  </td>
                                              </tr>
                                          </table>
                                      </div>
                                  </td>
                              </tr>
                          </table>
                          </td>
                      </tr>
                      <tr>
                          <td align="center" style=" padding: 35px; background-color: #ff7361;" bgcolor="#1b9ba3">
                          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                              <tr>
                                  <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;">
                                      <h2 style="font-size: 24px; font-weight: 800; line-height: 30px; color: #ffffff; margin: 0;">
                                          Get 30% off your next order.
                                      </h2>
                                  </td>
                              </tr>
                              <tr>
                                  <td align="center" style="padding: 25px 0 15px 0;">
                                      <table border="0" cellspacing="0" cellpadding="0">
                                          <tr>
                                              <td align="center" style="border-radius: 5px;" bgcolor="#66b3b7">
                                                <a href="#" target="_blank" style="font-size: 18px; font-family: Open Sans, Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; border-radius: 5px; background-color: #F44336; padding: 15px 30px; border: 1px solid #F44336; display: block;">Download Tickets</a>
                                              </td>
                                          </tr>
                                      </table>
                                  </td>
                              </tr>
                          </table>
                          </td>
                      </tr>
                      <tr>
                          <td align="center" style="padding: 35px; background-color: #ffffff;" bgcolor="#ffffff">
                          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                              <tr>
                                  <td align="center">
                                      <img src="https://www.modicare.com/favicon.ico" width="37" height="37" style="display: block; border: 0px;"/>
                                  </td>
                              </tr>
                              <tr>
                                  <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 24px; padding: 5px 0 10px 0;">
                                      <p style="font-size: 14px; font-weight: 800; line-height: 18px; color: #333333;">
                                      Modicare Limited, 5, Community Center, New Friends Colony, <br>
                                      New Delhi, Pin - 110025
                                      </p>
                                  </td>
                              </tr>
                              <tr>
                                  <td align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 24px;">
                                      <p style="font-size: 14px; font-weight: 400; line-height: 20px; color: #777777;">
                                          If you didn't create an account using this email address, please ignore this email or <a href="#" target="_blank" style="color: #777777;">unsusbscribe</a>.
                                      </p>
                                  </td>
                              </tr>
                          </table>
                          </td>
                      </tr>
                  </table>
                  </td>
              </tr>
          </table>
              
          </body>
          </html>`,
          tickets.map((ticket,index) => ({ // use URL as an attachment
            filename: `${ticket.sku}.jpg`,
            path: `http://192.168.29.248:5173/uploads/qr/modicare_events-${booking.id}/qrcode_${index+1}.png`
          }))
        // [
        //   { // use URL as an attachment
        //     filename: 'Ticket-1.jpg',
        //     path: `http://192.168.29.248:5173/uploads/qr/modicare_events-${booking.id}/qrcode_1.png`
        //   },
        //   { // use URL as an attachment
        //     filename: 'Ticket-2.jpg',
        //     path: 'http://192.168.29.248:5173/uploads/qr/modicare_events-34/qrcode_1.png'
        //   },
        // ]
        )
        // const mail = await sendEmail(booking.customer_email,'Tickets are booked for '+booking.event_id,'',`<b>${booking.total_qty_ordered} Tickets are booked</b>`)
        console.log(mail)
        return tickets;
      } catch (error) {
        console.log(error);
      }
    }
    const generateQRCodes = async (tickets, booking_id) => {
      // Create a folder for the booking
      try {
    const folderPath = path.join(__dirname, `../uploads/qr/modicare_events-${booking_id}`);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, {recursive: true});
    }

    // Generate QR codes for each ticket
    tickets.forEach((ticket, index) => {
      const qrData = `http://192.168.29.248:5173/app/ticket/attendance?sku=${ticket.sku}`;
      const qrCode = qr.image(qrData, { type: 'png' });
      const qrPath = path.join(folderPath, `qrcode_${index + 1}.png`);

      qrCode.pipe(fs.createWriteStream(qrPath));
    });

    console.log(`QR codes generated for booking ${booking_id}`);
  } catch (error) {
    console.error('Error generating QR codes:', error.message);
  }

      // const qrCodeFolder = './qrcodes'; // Set your folder path

      // try {
      //   await fs.mkdir(qrCodeFolder);
      // } catch (error) {
        // Folder already exists
      // }

      // for (const ticket of tickets) {
      //   const qrCodeData = JSON.stringify({ sku: ticket.sku, bookingId: ticket.bookingId });
      //   const qrCodePath = path.join(qrCodeFolder, `${ticket.sku}.png`);

      //   await qr.toFile(qrCodePath, qrCodeData);
      // }
    };
    const generateRandomSKU = () => {
      const randomSixDigitNumber = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
      const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const randomIndex = Math.floor(Math.random() * alphabets.length);
      const randomAlphabet = alphabets.charAt(randomIndex);
      return randomSixDigitNumber + randomAlphabet
    }
    console.log(booking_id);
    return booking_id;
  }
  
}
module.exports = paymentRepo;