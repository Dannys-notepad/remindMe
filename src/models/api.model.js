const db = require('../config/db')

class reminder{
  async match(date){
    const [result] = await db.execute('SELECT * FROM reminder WHERE ddate = ?', [date])
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
  
  async remove(id){
    const [result] = await db.execute('DELETE FROM reminder WHERE id = ?', [id])
    return result
  }
}

module.exports ={ reminder }