// <!-- Login System
// Please Create a Login System that must have these functionalities 
// 1. Login with JWT

// 2. Signupmb
// 3. Forgot Password
// 4. Update Profile (user can update his profile pic, email (if not already associated with another account), 
// first name, last name, gender and DOB)
// 5. Change Password (After Login)

// also create a frontend with react JS -->


const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const bdconnection  = require('./model/dbconnection')
const app = express()


app.use(express.json())

app.use(cors())

app.use(bodyparser.json())

app.use(express.urlencoded({ extended: true }))

const user = require('./routes/routes')

app.use('/api', user)

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`)
})

