const pixmail = require('pixmail')
const { parentPort } = require('worker_threads')
const { reminder } = require('../models/api.model')
const { isDDay } = require('../utils/dateChecker.js')
const reminders = new reminder()
let result, sent
setInterval(async () => {
  result = await reminders.all()
  if(result){
    for(let i = 0; i < result.length; i++){
      if(isDDay(result[i].date)){
        let configData = {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
          recipientEmail: result[i].email,
          subject: `${result[i].title} Reminder`,
          body: `Hello friend, it's the D-Day if your reminder. \nIt\'s ${result[i].title}. \nThanks for chossing email reminder.`
        }
        sent = await pixmail(configData)
      }
    }
  }
  /*result.forEach((d) => {
    dates.push(d.ddate)
  })*/
  
}, 60000 /* * 20*/);