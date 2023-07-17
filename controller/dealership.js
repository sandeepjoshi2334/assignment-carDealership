import { faker }  from '@faker-js/faker';
import solvehiclesDao from  '../dao/soldvehicles.js'
import carDao from  '../dao/car.js'
import dealDao from  '../dao/deal.js'
import dealershipDao from  '../dao/dealership.js'
import auth from  '../common/auth.js'
export function dealership_controller(app) {
      app.get('/getAllDealership', auth, async (req, res) => {
            try{
                  const dealership = await dealershipDao.find()
            res.send(dealership)
            }catch(e){
                  console.log(e)
                  res.send('internal system error').status(503)
                }
      })
       app.get('/getSoldCarsByDealership',auth, async (req, res) => {
            try{
                  const dealership = await dealershipDao.findOne({ dealership_id: req.query.dealership_id })
                  const soldvehicleIds = dealership.sold_vehicles
                  var cars=[]
                  for(var i=0;i<soldvehicleIds.length;i++){
                        var soldvehicle = await solvehiclesDao.findOne({ vehicle_id: soldvehicleIds[i] })
                        var car= await carDao.findOne({car_id:soldvehicle.car_id})
                          
                        cars.push(car)

                  }
                  res.send(cars)
                  console.log(cars)

            }catch(e){
                  console.log(e)
                  res.send('internal system error').status(503)
            }

       })
      app.get('/getSoldVehiclesByDealership', auth, async (req, res) => {
            try {

                  const dealership = await dealershipDao.findOne({ dealership_id: req.query.dealership_id })
                  const soldvehicleIds = dealership.sold_vehicles
                  var soldvehicles = []
                  for (var i = 0; i < soldvehicleIds.length; i++) {
                        var soldvehicle = await solvehiclesDao.findOne({ vehicle_id: soldvehicleIds[i] })
                        soldvehicles.push(soldvehicle)
                  } 
                  res.send(soldvehicles)
                  console.log(soldvehicles)
            } catch (e) {
                  console.log(e)
                  res.send('internal system error').status(503)
            }

      }) 
      app.get('/getDealsByDealership', auth, async (req,res) => {
            try{
                  const dealership = await dealershipDao.findOne({ dealership_id: req.query.dealership_id })
                  const dealsIds = dealership.deals
                  var deals = []
                  for(var i=0;i<dealsIds.length;i++){
                        var deal= await dealDao.findOne({deal_id: dealsIds[i]})
                        deals.push(deal)
                  } 
                  res.send(deals)
                    console.log(deals)
            }catch(e){
                  console.log(e)
                  res.send('internal system error').status(503)
            }
      })

      app.post('/addDealsToDealership', auth, async(req, res) => {
            try{  const dealership = await dealershipDao.findOne({dealership_id: req.body.dealership_id})
              var deal = { 
                  deal_id:'d' + faker.datatype.number({min:11,max:100}), 
                   car_id: req.body.car_id,
                   deal_info:'deal_info'  
           }
           console.log(dealership)
           await dealDao.insertOne(deal)
            dealership.deals.push(deal.deal_id)
            await dealershipDao.save(dealership)
            res.send('deal added successfully')
      }catch(e){
            console.log(e)
            res.send('internal system error').status(503)
          }
      })
      app.post('/addCarsToDealership', auth, async(req, res) => {
          try{  const dealership = await dealershipDao.findOne({dealership_id: req.body.dealership_id})
            var car = {
                  name: 'car' + faker.datatype.number({min:11,max:100}), 
                  model: faker.vehicle.model(),
                  car_id: 'c' + faker.datatype.number({min:11,max:100}), 
                  type: faker.vehicle.type(),
                  car_info: 'petrol car' + faker.datatype.number({min:11,max:100})
  
              }
         await carDao.insertOne(car)
          dealership.cars.push(car.car_id)
          await dealershipDao.save(dealership)
          res.send('car added successfully')
          }catch(e){
            console.log(e)
            res.send('internal system error').status(503)
          }
    })
    app.post('/saveDealership', auth, async (req, res) => {
      try{
      console.log(JSON.stringify(req.body));

      await dealershipDao.insertOne(req.body)

      res.send('dealership saved in database')
     
}catch(e){
      console.log(e)
      res.send('internal system error').status(503)
}
    })
}
export default dealership_controller