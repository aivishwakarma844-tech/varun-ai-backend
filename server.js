const nodemailer = require('nodemailer');

// Email task
async function sendEmailTask(payload) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,          // your Gmail
      pass: process.env.EMAIL_APP_PASSWORD   // Gmail App Password
    }
  });

  let info = await transporter.sendMail({
    from: `"VARUN AI" <${process.env.EMAIL_USER}>`,
    to: payload.to,
    subject: payload.subject,
    text: payload.body
  });

  return { success: true, message: `Email sent: ${info.messageId}` };
}
