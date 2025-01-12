const { validationResult } = require('express-validator')
const { reminder } = require('../models/api.model')
const mailer = require('../services/mailer')

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
  try {
    let result 
    const Reminder = new reminder();
    result = await Reminder.find(data.title)
    if(result){
      if(data.email === result.email && data.date === result.date){
        return res.status(400).json({
          statusCode: 400,
          errorMsg: 'This reminder has already been set'
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
        body: `Your reminder ${data.title} has been set successfully, you'll get reminder email on ${data.date}\n Thanks for chossing notifyme`
      }
      const mailSent = await mailer(smtpData)
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
  
  //console.log(req.body)
}

module.exports = {
  processAdd
}