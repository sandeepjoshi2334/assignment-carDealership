import mongodb from  '../common/mydb.js'

  const carDao = {
     find :async () => {
        const db = await mongodb()
        const collection =db.collection('cars')
        return collection.find({}).toArray()      
      },
      findOne:async (condition) => {
        const db = await mongodb()
        const collection =db.collection('cars')
        return collection.findOne(condition)      
      },
      insertOne:async (car) => {
        const db = await mongodb()
        const collection =db.collection('cars')
        return collection.insertOne(car)      
      },
  }
  export default carDao
  