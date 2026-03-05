// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Helper: simulate task execution
async function executeTask(task) {
    console.log('Executing task:', task);
    // Simulate success/failure
    if (task.taskName === 'send_email') {
        return { success: true, message: 'Email sent', task };
    } else if (task.taskName === 'manage_crm') {
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
