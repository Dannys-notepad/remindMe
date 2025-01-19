const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const { renderForm, processAdd } = require('../controllers/api.controller')

router.get('/add', renderForm)

router.post('/add', [
  check('email').isEmail().normalizeEmail(),
  check('title').isLength({min: 5, max: 100}),
  check('date').isLength({min: 10, max: 20})
  ], processAdd)
  
module.exports = router