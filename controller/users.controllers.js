const db = require('../models');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const sendPasswordResetEmail = require('../helpers/send-reset-email');

const User = db.User;
const resetPasswordToken = db.ResetPasswordToken;

const getUsers = async (req, res, next) => {
    try{
        const users = await User.findAll();
        res.status(200).json({
					status : 'success',
					results: users.length,
					data: {users}
        });
    } catch (err){
		res.status(404).json({"message" : `an error occured could not find any users... details: ${err}`})
    }
}

const getUserById = async (req, res, next) => {
    try {
			const user = await User.findByPk(req.params.id);
			res.status(200).json({
					status: "success",
					user
			})
    } catch (err) {
			res.status(404).json({"message" : `an error occured could not find a user ... details: ${err}`})
    }
}

const register = async (req, res, next) => {
    const {firstName, lastName, email, password} = req.body;
    try{
        if (!firstName || !lastName || !email || !password) throw new Error("please fill the body");

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, 8) 
        })

        const token = await jwt.sign({user}, 'secret', {expiresIn: '1h'});
        res.cookie('token', token, {httpOnly: true, secure: false, SameSite: 'strict', expires: new Date(Number(new Date()) + 60*60*1000)})

        res.status(201).json({
            "status": "success",
            user : {firstName, lastName, email},
            token
        });

    } catch (err) {
        res.status(404).json({"message" : `an error occured could not register user ... details: ${err}`})
    }
    
}

const login = async (req, res, next) => {
    const {email, password} = req.body;

    try { 
        const user = await User.findOne({where: {email : email}})
        if (!user) throw new Error("Could nnot find a user with this email");

        const isValidPassword = bcrypt.compareSync(password, user.password);
        if(!isValidPassword) throw new Error("wrong credentials");
        user.password = undefined;

        const token = await jwt.sign({user}, 'secret', {expiresIn: '1h'});
        res.cookie('token', token, {httpOnly: true, secure: false, SameSite: 'strict', expires: new Date(Number(new Date()) + 60*60*1000)})
    
        res.status(201).json({
            "status": "success",
            user : {user},
            token
        });
    } catch (err){
        res.status(404).json({"message" : `an error occured could not login user ... details: ${err}`})
    }
}

const forgotPassword = async (req, res, next) => {
    const email = req.body.email;
    const origin = req.headers.origin;
    console.log(origin)
    try {
        await resetPasswordToken.destroy({where : {email : email}});

        const token =  await resetPasswordToken.create({
            email,
            token_value: bcrypt.hashSync( crypto.randomBytes(16).toString("hex"), 8),
            createdAt: new Date(Date.now()),
            expired_at: new Date(Date.now() + 60*60*1000)
        });

        await sendPasswordResetEmail(email, token.token_value, origin);

        res.status(200).json({
            status: 'success',
            message: 'please check your email to reset your password'
        })

    } catch (err) {
        res.status(400).json({
            status: 'failure',
            message: `Somthing went wrong ... ${err}`
        })
    }
}

const resetPassword = async (req, res, next) => {
    const newPassword = req.body.password;
    const email = req.body.email;
    try {
        if (!newPassword || !email) throw new Error("no email or password was provided")
        
        const user = await User.findOne({where: {email: email}})

        await user.update({password: bcrypt.hashSync(newPassword, 8)},{
            where : {email : email}
        });

        res.status(200).json({
            status: "succes",
            message : "Password was changed successfully"
        });
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: `Somthing went wrong ... ${err}`
        })
    }
}
const updateUser = (req, res) => {

}

const deleteUser = (req, res) => {

}

module.exports = {
    getUsers,
    getUserById,
    register,
    login,
    updateUser,
    deleteUser,
    forgotPassword,
    resetPassword
}