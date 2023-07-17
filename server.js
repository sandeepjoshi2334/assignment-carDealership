import express from 'express';
const app = express()
import fs from 'fs'
import bodyParser from 'body-parser'
import mongodb from './common/mydb.js'
import admin from './controller/admin.js'
import car  from './controller/car.js'
import deal  from './controller/deal.js'
import dealership  from './controller/dealership.js'
import soldvehicles  from './controller/soldvehicles.js'
import user  from './controller/user.js'
const port = 3000
mongodb()
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
admin(app)

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
car(app)

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
deal(app)

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
dealership(app)

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
soldvehicles(app)

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
user(app)

app.get('/', (req, res) => {
  res.send('Hello World!')
})
 
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})