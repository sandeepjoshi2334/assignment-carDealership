import mongodb from  '../common/mydb.js'

  const soldvehiclesDao = {
     find :async () => {
        const db = await mongodb()
        const collection =db.collection('soldvehicles')
        return collection.find({}).toArray()      
      },
      findOne:async (condition) => {
        const db = await mongodb()
        const collection =db.collection('soldvehicles')
        return collection.findOne(condition)      
      },
      insertOne:async (soldvehicle) => {
        const db = await mongodb()
        const collection =db.collection('soldvehicles')
        return collection.insertOne(soldvehicle)      
      },
  }
  export default soldvehiclesDao
  