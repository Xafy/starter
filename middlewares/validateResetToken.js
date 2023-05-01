const { Op } = require('sequelize');
const db = require('../models/index');

const resetPasswordToken = db.ResetPasswordToken

const validateResetToken = async (req, res, next) => {
    const email = req.body.email;
    const resetToken = req.body.token;

    try {

        if(!email || !resetToken) throw new Error("no email or token provided")

        const currentTime = new Date(Date.now());

        const token = await resetPasswordToken.findOne({
            where:{
                email: email,
                token_value: resetToken,
                expired_at:{
                    [Op.gt] : currentTime
                }
            }});

        if(!token) throw new Error("Could not find token");
        
        next();
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: `somthing went wrong...${err}`
        })
    }
    

}

module.exports = validateResetToken;