import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken';

export const registerController = async (req,res) => {
    try {
        const {name,email,password,phone,address} = req.body;
        // validations
        if(!name){
            return res.send({error:'Name is Required'})
        }
        if(!email){
            return res.send({error:'Email is Required'})
        }
        if(!password){
            return res.send({error:'Password is Required'})
        }
        if(!phone){
            return res.send({error:'Phone is Required'})
        }
        if(!address){
            return res.send({error:'Address is Required'})
        }
        // check user
        const existingUser = await userModel.findOne({email})
        // check existing user
        if(existingUser){
            return res.status(200).send({
                success:true,
                message:'Alreadry Registered Please Login',
            })
        }
        // register user
        const hashedPassword = await hashPassword(password);
        // save
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password:hashedPassword,
        }).save();

        res.status(201).send({
            success:true,
            message:'User Registered Successfully',
            user,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Registration',
            error
        });
    }
};
// POST LOGIN(New Route)
export const loginController = async (req,res) => {
    try {
        const {email,password} = req.body
        // Validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'Invalid email or password'
            })
        }
        // Check User
        const user = await userModel.findOne({email})
        if(!user){
            return res.status404.send({
                success:false,
                message:'Email is not registered'
            })
        }
        // Check password
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:'Invalid Password'
            })
        }
        // Token Creation
         const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn:'7d'});
         res.status(200).send({
            success:true,
            message:'Logged In Successfully',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            },
            token,
         })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in login',
            error,
        });
    }
};

// Test Controller
export const testController = (req,res) =>{
    res.send("Protected Routes");
};