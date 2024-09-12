
const expreess = require('express')
const router = expreess.Router()


const login = require('../controller/login')


router.post('/login', login.login)
router.get('/Register', login.Register)
router.get('/forgotPassword', login.forgotPassword)
router.get('/changePassword', login.changePassword)
router.get('/EditProfile', login.EditProfile)


module.exports = router