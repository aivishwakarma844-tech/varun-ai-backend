// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(bodyParser.json());

// Configure Gmail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,       // your Gmail address
    pass: process.env.EMAIL_APP_PASSWORD,  // app password you just created
  },
});

// Helper: execute tasks
async function executeTask(task) {
  console.log('Executing task:', task);

  if (task.taskName === 'send_email') {
    try {
      const info = await transporter.sendMail({
        from: process.env.EMAIL_ADDRESS,
        to: task.to,
        subject: task.subject,
        text: task.body,
      });
      console.log('Email sent:', info.response);
      return { success: true, message: 'Email sent', task };
    } catch (err) {
      console.error('Email send error:', err);
      return { success: false, message: 'Email send failed', error: err.message, task };
    }
  }

  // Keep other tasks simulated for now
  else if (task.taskName === 'manage_crm') {
    return { success: true, message: 'CRM lead added', task };
  } else if (task.taskName === 'update_sheet') {
    return { success: true, message: 'Sheet updated', task };
  } else if (task.taskName === 'create_event') {
    return { success: true, message: 'Event created', task };
  } else {
    return { success: false, message: 'Unknown task', task };
  }
}

// Main endpoint
app.post('/varun-task-handler', async (req, res) => {
  const payload = req.body;
  try {
    const result = await executeTask(payload);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => console.log(`VARUN AI backend running on port ${PORT}`));
