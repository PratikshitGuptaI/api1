const nodemailer = require('nodemailer');

async function sendEmail(to, subject, text,html,attachments) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'channelharsh4561@gmail.com',
      pass: 'ilfvuiuvufzgswgu',
    },
  });

  const mailOptions = {
    from: 'channelharsh4561@gmail.com',
    to,
    subject,
    text,
    html,
    attachments
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) { 
    console.error('Error sending email:', error);
  }
}

module.exports = { sendEmail };