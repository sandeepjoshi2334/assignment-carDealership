import mongodb from  '../common/mydb.js'

  const usersDao = {
     find :async () => {
        const db = await mongodb()
        const collection =db.collection('users')
        return collection.find({}).toArray()      
      },
      findOne:async (condition) => {
        const db = await mongodb()
        const collection =db.collection('users')
        return collection.findOne(condition)      
      },
      save:async (doc) => {
        const db = await mongodb()
        const collection =db.collection('users')
        return collection.replaceOne({_id:doc._id}, doc)      
      },
      insertOne:async (user) => {
        const db = await mongodb()
        const collection =db.collection('users')
        return collection.insertOne(user)      
      },
  }
  export default usersDao
  