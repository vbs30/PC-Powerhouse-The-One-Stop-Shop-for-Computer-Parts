import express from 'express'
import { registerController, loginController, testController, forgetPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController } from '../controllers/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'

//router obj
const router = express.Router()

//routing
//register || method post
router.post('/register', registerController)

//login || method post
router.post('/login', loginController)

//test route
router.get('/test', requireSignIn, isAdmin, testController)

//Forget password || post
router.post('/forget-password', forgetPasswordController)

//protected auth user route
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true })
})

//protected auth admin route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true })
})

router.put('/profile', requireSignIn, updateProfileController)

router.get('/orders', requireSignIn, getOrdersController)

router.get('/all-orders', requireSignIn, isAdmin, getAllOrdersController)

router.put('/order-status', requireSignIn, isAdmin, orderStatusController)


export default router