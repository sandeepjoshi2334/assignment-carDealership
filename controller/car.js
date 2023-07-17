import { faker }  from '@faker-js/faker';
import auth  from '../common/auth.js'
import carDao  from '../dao/car.js'
import dealDao  from '../dao/deal.js'
import dealershipDao   from '../dao/dealership.js'
export function car_controller(app) {
    app.get('/getAllCar', auth,  async (req, res) => {
       try{
        const cars = await carDao.find() 
        res.send(cars)
       }catch(e){
        console.log(e)
        res.send('internal system error').status(503)
      }
    })
    app.get('/getDealershipByCar', auth, async (req, res) => {
        try {
            const carId = req.query.carId
            const dealerships = await dealershipDao.find({})
            for (var i = 0; i < dealerships.length; i++) {
                for (var j = 0; j < dealerships[i].cars.length; j++) {
                    if (carId == dealerships[i].cars[j]) {
                        res.send(dealerships[i])
                    }
                }
            }
            console.log(dealerships)
        } catch (e) {
            console.log(e)
            res.send('internal system error').status(503)
        }
    })

    app.get('/getAllDealsByCar', auth, async (req, res) => {

        try {
            const carId = req.query.carId
            const deals = await dealDao.find({ car_id: carId })
            res.send(deals)
            console.log(deals)
        }

        catch (e) {
            console.log(e)
            res.send('internal system error').status(503)
        }
    })
    app.get('/getDealsByDealership', auth, async (req, res) => {
        try {
            console.log(req.query.dealership_id)
            const dealership = await dealershipDao.findOne({ dealership_id: req.query.dealership_id })
            const dealIds = dealership.deals
            console.log('dealids' + dealIds)
            var deals = []
            for (var i = 0; i < dealIds.length; i++) {
                var deal = await dealDao.findOne({ deal_id: dealIds[i] })
                deals.push(deal)
            }
            res.send(deals)
        } catch (e) {
            console.log(e)
            res.send('internal system error').status(503)
        }
        
    })

    app.get('/getCarsByDealership', auth, async (req, res) => {
        try {

            console.log(req.query.dealershipId)
            const dealerships = await dealershipDao.findOne({ dealership_id: req.query.dealershipId })
            const carIds = dealerships.cars
            console.log('carids' + carIds)
            var cars = []
            for (var i = 0; i < carIds.length; i++) {
                var car = await carDao.findOne({ car_id: carIds[i] })
                cars.push(car)
            }
        } catch (e) {
            console.log(e)
            res.send('internal system error').status(503)
        }
        res.send(cars)

    })
    app.post('/saveCar', auth, async (req, res) => {
       try{

        console.log(JSON.stringify(req.body));

            await carDao.insertOne(req.body)
        
        res.send('car saved in database')
       }catch(e){
        console.log(e)
        res.send('internal system error').status(503)
      }

    })

}
export default car_controller