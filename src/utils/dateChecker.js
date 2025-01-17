const isValid = (date) => {
  if(typeof date !== 'string'){
    //throw new Error('the parameter value can\'t be any other data type except a string')
    return false
  }
  
  const sample = date.split('-')
  if(sample.length !== 3){
    return false 
  }
  return true
}

const isPast = (date) => {
  const presentDate= new Date()
  const sample = date.split('-')
  const day = +sample[0]
  const month = +sample[1]
  const year = +sample[2]
  
  if(year >= presentDate.getFullYear()){
    return false
  }
  
  if((presentDate.getMonth() === month) && (day > presentDate.getDate() || day === presentDate.getDate())){
    return false
  }
  
  if((month > presentDate.getMonth()) && (day ===  presentDate.getDate() || day > presentDate.getDate())){
    return false
  }
  
  return true 
}

const isDDay = (date) => {
  const presentDate= new Date()
  const sample = date.split('-')
  const day = +sample[0]
  const month = +sample[1]
  const year = +sample[2]
  
  if(presentDate.getDate() === day && presentDate.getMonth() === month && presentDate.getFullYear() === year){
    return true
  }
  return false
}

/*const checkDate = (date) => {
  const presentDate= new Date()
  const sample = date.split('-')
  const day = +sample[0]
  const month = +sample[1]
  const year = +sample[2]
  
  if(presentDate.getDate() === day){
    return true
  }
  
  if(presentDate.getMonth() === month){
    return true
  }
  
  if(presentDate.getFullYear() === year){
    return true
  }
  return false
}*/

module.exports = {
  isValid,
  isPast,
  isDDay
}