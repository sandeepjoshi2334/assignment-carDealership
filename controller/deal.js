import { faker }  from  '@faker-js/faker';
import dealDao from '../dao/deal.js'
import auth from '../common/auth.js'
export function deal_controller(app) {
   app.get('/getAllDeal', auth, async (req, res) => {
      try{
      const deal = await dealDao.find()
      res.send(deal)
      }catch(e){
         console.log(e)
         res.send('internal system error').status(503)
       }
   })
   app.post('/saveDeal', auth, async (req, res) => {
      console.log(JSON.stringify(req.body));

      await dealDao.insertOne(req.body)

      res.send('deal saved in database')


   })

}
export default deal_controller