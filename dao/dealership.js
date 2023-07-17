import mongodb from  '../common/mydb.js'

  const dealershipDao = {
     find :async () => {
        const db = await mongodb()
        const collection =db.collection('dealerships')
        return collection.find({}).toArray()      
      },
      findOne:async (condition) => {
        const db = await mongodb()
        const collection =db.collection('dealerships')
        return collection.findOne(condition)      
      },
      save:async (doc) => {
        const db = await mongodb()
        const collection =db.collection('dealerships')
        return collection.replaceOne({_id:doc._id}, doc)      
      },
      insertOne:async (dealership) => {
        const db = await mongodb()
        const collection =db.collection('dealerships')
        return collection.insertOne(dealership)      
      },
  }
  export default dealershipDao
  