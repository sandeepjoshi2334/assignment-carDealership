import { MongoClient, ObjectId } from  'mongodb'
var connectionUrl = "mongodb://127.0.0.1:27017/carDealership";
let db
var dbName = 'carDealership'
const mongodb = async () => {
    if(db){
        return db;
    }
      const client = await  MongoClient.connect(connectionUrl, { useNewUrlParser: true })  
            db = client.db(dbName)
         
 
    return db
}
export default mongodb;