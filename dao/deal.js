import { MongoClient, ObjectId }from  'mongodb'
import mongodb from  '../common/mydb.js'
 const dealDao ={
  find :async () => {
    const db = await mongodb()
    const collection =db.collection('deals')
    return collection.find({}).toArray()      
  },
  findOne:async (condition) => {
    const db = await mongodb()
    const collection =db.collection('deals')
    return collection.findOne(condition)      
  },
        insertOne:async (deal) => {
        const db = await mongodb()
        const collection =db.collection('deals')
        return collection.insertOne(deal)      
      }
    }
  
 export default dealDao