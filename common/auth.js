import jwt from 'jsonwebtoken'
const verifytoken = (req, res, next) => {
    
    const token = req.headers["token"]
    if(!token){
        return res.status(403).send('please provide token')
    }
    try{
        const decrypt = jwt.verify(token, 'testKey')

    }catch(e){
        console.log(e)
        return res.status(401).send('unauthorised user')
    }
    return next();
}
export default verifytoken