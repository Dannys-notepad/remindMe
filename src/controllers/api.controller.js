const { validationResult } = require('express-validator')
const { reminder } = require('../models/api.model')
const { isValid, isPast, isDDay } = require('../utils/dateChecker.js')
const pixmail = require('pixmail')

const processAdd = async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({
      statusCode: 400,
      error: errors
    })
  }
  
  const { email, title, date} = await req.body
  let data = {
    email,
    title,
    date
  }
  
  if(!isValid(date)){
    return res.status(400).json({
      statusCode: 400,
      error: 'the date provided is not valid'
    })
  }
  
  if(isPast(date)){
    return res.status(400).json({
      statusCode: 400,
      error: 'this date has already past'
    })
  }
  
  try {
    let result 
    const Reminder = new reminder();
    result = await Reminder.find(data.title)
    if(result){
      if(data.email === result.email && data.date === result.date){
        return res.status(400).json({
          statusCode: 400,
          error: 'This reminder has already been set'
        })
      }
    }
    result = await Reminder.add(data)
    if(result){
      let smtpData = {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
        recipientEmail: data.email,
        subject: 'Reminder Set Successful',
        body: `Your ${data.title} reminder has been set successfully, you'll get an email reminder on the D-Day ${data.date}.\nThanks for chossing mail reminder.`
      }
      const mailSent = await pixmail(smtpData)
      return res.status(201).json({
        statusCode: 201,
        msg: 'Succesfully set reminder'
      })
    }
  } catch (e) {
    console.error(e)
    return res.status(500).json({
      statusCode: 500,
      errorMsg: 'Failed to set reminder'
    })
  }
}

module.exports = {
  processAdd
}