const login = require('../model/login')
const userModel = require('../model/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const login = async (req, res) => {

    const { email, password } = req.body

    if(!email || !password) {
        return res.status(400).json({ 
            status: false,
            massage: "missing Requird Data",
            data: null
         })
    }

    try {
        const existingUser = await userModel.findOne({ email })

        if(!existingUser) {
            return res.status(404).json({ 
                status: false,
                massage: "User not found",
                data: null
             })
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if(!isPasswordCorrect) {
            return res.status(400).json({ 
                status: false,
                massage: "Wrong Password",
                data: null
             })
        }  
        
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h' })

        res.status(200).json({ 
            status: true,
            massage: "Login Success",
            data: token
         })

    } catch (error) {
        
        return res.status(500).json({ 
            status: false,
            massage: "Internal Server Error",
            data: null
         })
    }
}


const Register = async (req, res) => {
    const { first_name, last_name, email, password, gender, DOB } = req.body

    if(!first_name || !last_name || !email || !password || !gender || !DOB) {
        return res.status(400).json({ 
            status: false,
            massage: "missing Requird Data",
            data: null
         })
    }

    try {
        const existingUser = await userModel.findOne({ email })

        if(existingUser) {
            return res.status(400).json({ 
                status: false,
                massage: "User Already Exist",
                data: null
             })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await userModel.insertMany({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            gender,
            DOB
        })

        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '1h' })

        res.status(200).json({ 
            status: true,
            massage: "Register Success",
            data: token
         })

    } catch (error) {
        
        return res.status(500).json({ 
            status: false,
            massage: "Internal Server Error",
            data: null
         })
    }
}


const forgotPassword = async (req, res) => {
    try {
     const { email } = req.body
     const user = await userModel.findOne({ email }) 


     if(!user) {
        return res.status(404).json({ 
            status: false,
            massage: "User not found",
            data: null
         })
     }

     const  OTP =  Math.floor(100000 + Math.random() * 900000)
     const TO = user.email
     const subject = "FORGET pASSWORD OTP"
     const BODY = `Your OTP is ${OTP}`

     await sendEmail(TO, subject, BODY)

     // update in database
     await userModel.updateOne({ email }, { $set: { OTP } })
     return res.status(200).json({ 
        status: true,
        massage: "OTP send successfully",
        data: OTP
     })



    } catch (error) {
        return res.status(500).json({
            status: false,
            massage: "Internal Server Error",
            data: null
        })   
    }
}

const EditProfile = async (req, res) => {
    try {
        const { first_name, last_name, email, password, gender, DOB } = req.body
        const user = await userModel.findOne({ email })

        if(!user) {
            return res.status(404).json({ 
                status: false,
                massage: "User not found",
                data: null
             })
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const result = await userModel.updateOne({ email }, { $set: { first_name, last_name, email, password: hashedPassword, gender, DOB } })

        res.status(200).json({ 
            status: true,
            massage: "Profile Updated",
            data: null
         })
    } catch (error) {
        return res.status(500).json({ 
            status: false,
            massage: "Internal Server Error",
            data: null
         })
    }
}

const changePassword = async (req, res) => {
    try {
        const { email, oldPassword, newPassword } = req.body
        const user = await userModel.findOne({ email })

        if(!user) {
            return res.status(404).json({ 
                status: false,
                massage: "User not found",
                data: null
             })
        }

        const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password)

        if(!isPasswordCorrect) {
            return res.status(400).json({ 
                status: false,
                massage: "Wrong Password",
                data: null
             })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12)
        const result = await userModel.updateOne({ email }, { $set: { password: hashedPassword } })

        res.status(200).json({ 
            status: true,
            massage: "Password Updated",
            data: null
         })
    } catch (error) {
        return res.status(500).json({ 
            status: false,
            massage: "Internal Server Error",
            data: null
         })
    }
}



module.exports = { login, Register ,forgotPassword, changePassword, EditProfile }