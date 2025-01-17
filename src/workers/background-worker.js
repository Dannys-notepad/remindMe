const pixmail = require('pixmail');
const { reminder } = require('../models/api.model');
const { isDDay } = require('../utils/dateChecker.js');

const reminders = new reminder();

const sendReminders = async () => {
  try {
    const reminderData = await reminders.all();

    if (reminderData) {
      reminderData.forEach((reminder) => {
        if (isDDay(reminder.date)) {
          const configData = {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
            recipientEmail: reminder.email,
            subject: `${reminder.title} Reminder`,
            body: `Hello friend, it's the D-Day of your reminder. \nIt's ${reminder.title}. \nThanks for choosing email reminder.`,
          };

          await pixmail(configData);
        }
      });
    }
  } catch (error) {
    console.error('Error sending reminders:', error);
  }
}

setInterval(sendReminders, 60000);