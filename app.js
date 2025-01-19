require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT
require('./src/workers/background-worker.js')
const apiRoutes = require('./src/routes/api.route')

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'src/public')))

app.use('/api/v1/reminder/', apiRoutes)
app.get('/', (req, res) => {
  res.redirect('/api/v1/reminder/add')
})
app.listen(port, () => {
  console.log('Server up and running ')
})