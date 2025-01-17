const { Worker } = require('worker_threads')
const worker = new Worker('./src/workers/background-worker.js')

worker.on('message', (message) => {
  console.log(message)
})
worker.on('error', (error) => {
  console.log(error)
})
worker.on('exit', (code) => {
  console.log(`Program exit with code ${code}`)
})
