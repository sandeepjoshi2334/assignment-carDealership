import jwt from 'jsonwebtoken'
import adminDao from '../dao/admin.js'
function admin_controller(app) {

  app.get('/adminlogin', async (req, res) => {
    try{
      const admin = await adminDao.findOne({ admin_id: req.query.admin_id })
    if (!admin) {
      res.send('adminid is wrong')
    }
    else if (req.query.password != admin.password) {
      res.send('password is incorrect')
    } else {
      var jwtSecretKey = 'testKey';
      var data = {
        time: Date(), adminId: 1,
        userName: 'admin'
      };
      const token = jwt.sign(data, jwtSecretKey)
      res.send(token)
    }
  }catch(e){
    console.log(e)
    res.send('internal system error').code
  }
   
  })
}

export default admin_controller