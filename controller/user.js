import userDao from  '../dao/user.js'
import { faker }  from '@faker-js/faker';
import jwt from 'jsonwebtoken'
import dealershipDao from  '../dao/dealership.js'
import auth from  '../common/auth.js'
export function user_controller(app) {
  app.get('/getAllUser', auth, async (req, res) => {
    try{
    const user = await userDao.find()
    res.send(user)
    }catch(e){
      console.log(e)
      res.send('internal system error').status(503)
    }
  })
  app.post('/saveUser', auth, async (req, res) => {
    try{
    console.log(JSON.stringify(req.body));

    await dealershipDao.insertOne(req.body)

    res.send('user saved in database')
    }catch(e){
      console.log(e)
      res.send('internal system error').status(503)
    }
   })
  
  app.get('/login', auth, async (req, res) => {
    try{
    const user = await userDao.findOne({ user_info: req.query.user_info })
    if(!user) {
      res.send('username is wrong')
    }  
      if (req.query.password!=user.password) {
      res.send('password is incorrect')
    } else{
        var jwtSecretKey = 'testKey';
        var data={
        time:Date(),
        user:user
    };
      const token = jwt.sign(data,jwtSecretKey)
        res.send(token)
    }
  }catch(e){
    console.log(e)
    res.send('internal system error').status(503)
  }
  })
}
export default user_controller