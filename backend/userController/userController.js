// AUTH USER/SER TOKEN
// ROUTE POST/API/USERS/AUTH
// ACESS PUBLIC
import asynchandler from 'express-async-handler'
import users from '../model/userModel.js'
import generateToken from '../utils/generateToken.js'
const authUser = asynchandler(async (req,res)=> {
    const {password,email} = req.body
    const User = await users.findOne({email}) 
    if(User && (await User.matchPassword(password))){
        generateToken(res,User._id)
        res.status(201).json({
            _id : User._id,
            name: User.name,
            email: User.email

        })

    }
    else {
        res.status(401)
        throw new Error("invalid email or password")
    }
   
})

const registerUser = async (req,res)=> {
    const {name,email,password} = req.body
    const userExits = await users.findOne({email})
    if(userExits){
        res.status(400).json({message:"user already exits"})
        throw new Error("User already exits");
    
    }
    const User =await users.create({
        name,
        email,
        password
    })
    if(User){
        generateToken(res,User._id)
        res.status(201).json({
            _id : User._id,
            name: User.name,
            email: User.email

        })

    }
    else {
        res.status(400)
        throw new Error("invalid user")
    }

}
const logoutUser = (req,res)=> {
    res.cookie('jwt',"",{
        httpOnly: true,
        expires: new Date(0)
    })
res.status(200).json({message:"Logout user"})

}
const getUserProfile = asynchandler( (req,res)=> {
    const  user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
res.status(200).json({message:user})

})
const updateUserProfile = asynchandler(async (req,res)=> {
 const user = await users.findById(req.user._id);
 if(user){
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if(req.body.password){
        user.password = req.body.password
    }
   const updatedUser = await user.save() 
   res.status(200).json({
    _id: updatedUser._id,
    email: updatedUser.email,
     name: updatedUser.name,
   })
 }
 else {
    res.status(404)
    throw new Error("user not found")
 }


})



export {authUser,registerUser,logoutUser,getUserProfile,updateUserProfile}