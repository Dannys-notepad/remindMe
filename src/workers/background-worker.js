const cron = require('node-cron');
const pixmail = require('pixmail')
pixmail.setup({
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASS
})
const { reminder } = require('../models/api.model');
//const { isDDay } = require('../utils/dateChecker.js');
const reminders = new reminder();

// Cron job to run every minute
cron.schedule('*/30 * * * *', async () => {
  console.log('Worker running ')
  const presentDate = new Date();
  const day = presentDate.getDate();
  let month = presentDate.getMonth() + 1;
  const year = presentDate.getFullYear();
  if(month.toString().length < 2){
    month = `0${presentDate.getMonth() + 1}`
  }
  const fullDate = `${day}-${month}-${year}`
  //console.log(fullDate)
  try {
    const result = await reminders.match(fullDate);
    //console.log(result)
    if(result){
      result.forEach( async (reminder) => {
        const mail = await pixmail.sendMail({
          from: process.env.SMTP_USER,
          to: reminder.email,
          subject: `A Reminder`,
          body: `Hello friend, it's the D-Day of your reminder. \n${reminder.title}. \nThanks for choosing email reminder.`,
        });
        const deleteReminder = await reminders.remove(reminder.id)
      })
    }
  } catch (e) {
    console.error('Error sending reminders:', error);
  }
});
