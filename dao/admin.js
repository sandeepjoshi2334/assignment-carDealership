import mongodb from  '../common/mydb.js'

  const adminDao = {
     find :async () => {
        const db = await mongodb()
        const collection =db.collection('admins')
        return collection.find({}).toArray()      
      },
      findOne:async (condition) => {
        const db = await mongodb()
        const collection =db.collection('admins')
        return collection.findOne(condition)      
      },
      insertOne:async (admin) => {
        const db = await mongodb()
        const collection =db.collection('admins')
        return collection.insertOne(admin)      
      },
  }
  export default adminDao
  