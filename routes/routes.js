
const expreess = require('express')
const router = expreess.Router()


const login = require('../controller/login')


router.post('/login', login.login)
router.post('/Register', login.Register)
router.post('/forgotPassword', login.forgotPassword)
router.post('/changePassword', login.changePassword)
router.post('/EditProfile', login.EditProfile)


module.exports = router