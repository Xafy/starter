const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    console.log(token)
    try{
        if(token === undefined) throw new Error("No Token Was Provided");
        console.log(token)

        const authorized = jwt.verify(token, 'secret');
        console.log(authorized)

        return next();
    } catch (error){
        res.status(403).json({
            status: 'failed',
            message: 'Not Authorized',
            error: `${error}`
        })
    }
}

const isAdmin = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token)
    try{
        if(token === undefined) throw new Error("No Token Was Provided");
        console.log(token)

        const authorized = jwt.verify(token, 'secret');
        
        if(authorized.user.role !== "isAdmin") {
            throw new Error("You are not an admin")
        }

        return next();
    } catch (error){
        res.status(403).json({
            status: 'failed',
            message: 'Not Authorized',
            error: `${error}`
        })
    }
}

module.exports = {
    verifyToken,
    isAdmin
}