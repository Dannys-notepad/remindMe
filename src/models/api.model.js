const db = require('../config/db')

class reminder{
  async all(){
    const [result] = await db.execute('SELECT * FROM reminder')
    return result
  }
  
  async add(data){
    const [result] = await db.execute('INSERT INTO reminder (email, title, ddate) VALUES (?, ?, ?)', [data.email, data.title, data.date])
    return result.insertId
  }
  
  async find(title){
    const [result] = await db.execute('SELECT * FROM reminder WHERE title = ?', [title])
    return result[0]
  }
}

module.exports ={  reminder }