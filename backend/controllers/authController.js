const generateToken = require('../utils/generateToken');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

const registerUser = asyncHandler(async(req,res)=>{
    const {fullName,email,address,phoneNumber,password}= req.body;

    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error('User already Exist with this email')
    };

    const user =await User.create({
        fullName,email,address,phoneNumber,password
    });
    console.log("user created:",user);
    if(user){
        const token = generateToken(user._id);
        const cookieOptions = {
            expires: new Date(
                Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
            ),
            httpOnly:true,
        }
        res.status(201).cookie('token',token,cookieOptions).json({
            success:true,
            message:'User registered successfully',
            user:{
                _id:user._id,
                fullname:user.fullName,
                email:user.email,
                phoneNumber:user.phoneNumber,
                address:user.address,
                role:user.role,
            },
            token

        });
    }else{
        res.status(400);
        throw new Error('Invalid user Data');
    };
});

const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error('Please provide email and password')
    }

    const user = await User.findOne({email}).select('+password');
    if(user && (await user.matchPassword(password))){
        const token = generateToken(user._id);
        const cookieOptions = {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly:true,
        };
        res.status(200).cookie('token',token,cookieOptions).json({
            success:true,
            message:'User Login successful',
            user:{
                _id:user._id,
                fullname:user.fullName,
                email:user.email,
                phonenumber:user.phonenumber,
                address:user.address,
                role:user.role,
            },
            token
        })
    }else{
        res.status(401);
        throw new Error('Invalid email or password');
    };
});

const logoutUser = asyncHandler(async (req, res) => {
    // Clear cookie
    res.cookie('token', '', {
      expires: new Date(0),
      httpOnly: true,
    });
  
    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  });
const getMe = asyncHandler(async (req, res) => {
    const user = req.user;
        // const user = await User.findById(req.user._id).select('-password');
        console.log("user in getMe=",user)
        if (!user) {
            return res.status(404);
            throw new Error('User not Found');
        }
        
        res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                address: user.address,
                role: user.role,
            }
        });

  })
module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getMe,
  };