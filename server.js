const nodemailer = require('nodemailer');

async function executeTask(task) {
    if (task.taskName === 'send_email') {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'aivishwakarma844@gmail.com', // your email
                pass: process.env.EMAIL_APP_PASSWORD // app password
            }
        });

        try {
            let info = await transporter.sendMail({
                from: '"VARUN AI" <aivishwakarma844@gmail.com>',
                to: task.to,
                subject: task.subject,
                text: task.body
            });
            console.log('Email sent:', info.messageId);
            return { success: true, message: 'Email sent', task };
        } catch (err) {
            console.error('Email failed:', err);
            return { success: false, message: 'Email send failed', error: err.message };
        }
    }
    // other tasks...
}
