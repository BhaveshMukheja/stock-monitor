const prisma = require('../prisma/index')
const { body, validationResult } = require('express-validator');
const cookieToken = require('../utils/cookieToken')
const bcrypt = require("bcrypt")
const saltRounds = 10

// user signup 

exports.signup = async(req, res, next) => {
    try {
        const{name, email, password} = req.body
        //check

        
        if(!name || !email || !password){
            throw new Error("Please enter the valid inputs")
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        const user = await prisma.user.create({
            data:{
                name: name, 
                email: email,
                password: secPass,
            }
        })

        //send user a token
        cookieToken(user, res)
        
    } catch (error) {
        throw new Error(error)
    }
}

//user login

exports.login = async(req,res,next) => {
    try {
        const {email, password} = req.body
        if(!email || !password){
            throw new Error('Please provide email and passowrd')
        }

        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })

        if (!user){
            throw new Error('user not found')
        }
    
        
            const match = await bcrypt.compare(password, user.password);
            // console.log(password, user.password);
    
        if(!match){
            
            throw new Error('password is incorrect')
        }

        cookieToken(user, res)
        
    } catch (error) {
        throw new Error(error)
    }
}

//logout 

exports.logout = async(req, res, next)=>{
    try {
        res.clearCookie('token');
        res.json(
        {
            success: true
        }
        )
    } catch (error) {
        throw new Error(error)
    }
}
