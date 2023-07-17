import { faker }  from '@faker-js/faker';
import userDao from  '../dao/user.js'
import solvehiclesDao from  '../dao/soldvehicles.js'
import dealDao from  '../dao/deal.js'
import carDao from  '../dao/car.js'
import dealershipDao from  '../dao/dealership.js'
import auth from  '../common/auth.js'
import soldvehiclesDao from '../dao/soldvehicles.js';
export function soldvehicles_controller(app) {
        app.get('/getAllSoldvehicles',auth, async (req, res) => {
                try{
                        const sold = await solvehiclesDao.find()
                res.send(sold)
                }catch(e){
                        consle.log(e)
                        res.send('internal system error').status(503)
                }
        })

        app.get('/getSoldVehiclesByUser', auth, async (req, res) => {

                try {
                        console.log(req.query.userId)
                        const user = await userDao.findOne({ user_id: req.query.userId })
                        const vehicleIds = user.vehicle_info
                        console.log("vehiclesid   " + vehicleIds)
                        var cars = []
                        for (var i = 0; i < vehicleIds.length; i++) {
                                var vehicle_info = await solvehiclesDao.findOne({ vehicle_id: vehicleIds[i] })
                                var car = await carDao.findOne({ car_id: vehicle_info.car_id })
                                console.log(car)
                                cars.push(car)
                        }
                        res.send(cars)
                } catch (e) {
                        console.log(e)
                        res.send('internal system error').status(503)
                }


        })

        app.post('/saveNewSoldvehicleToDealership', auth, async (req, res) => {
                try{
                const deal = await dealDao.findOne({ deal_id: req.body.deal_id })
                const user = await userDao.findOne({ user_id: req.body.user_id })
                const dealership = await dealershipDao.findOne({ dealership_id: req.body.dealership_id })

                var sold_vehicle = {
                        vehicle_id: 'v' + faker.datatype.number({ min: 11, max: 100 }),
                        car_id:deal.car_id,
                        vehicle_info: 'vehicle' + faker.datatype.number({ min: 11, max: 100 })
                }
                await solvehiclesDao.insertOne(sold_vehicle)
                
                dealership.sold_vehicles.push(sold_vehicle.vehicle_id)
                await dealershipDao.save(dealership)
                user.vehicle_info.push(solvehiclesDao.vehicle_id)
                await userDao.save(user)
                res.send('new sold vehicle added successfully')
        }catch(e){
                console.log(e)
                res.send('internal system error').status(503)
              }
        })
        app.post('/saveSoldvehicles', auth, async (req, res) => {
                try{
                console.log(JSON.stringify(req.body));
          
                await soldvehiclesDao.insertOne(req.body)
          
                res.send('soldvehicles is saved in database')
                }catch(e){
                        console.log(e)
                        res.send('internal system error').status(503)
                      }
               })
}
export default soldvehicles_controller