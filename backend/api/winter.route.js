import express from "express"
import winterCtrl from "./winter.controller.js"

const router = express.Router()

//router.route("/movie/:id").get(winterCtrl.apiGetwinter)
router.route("/new").post(winterCtrl.apiPostwinter)
router.route("/random")
    .get(winterCtrl.apiGetrandomwinter)
//    .put(winterCtrl.apiUpdatewinter)
router.route("/delete")
    .delete(winterCtrl.apiDeletewinter)
router.route("/login")
    .post(winterCtrl.apiLogin)
router.route("/logout")
    .put(winterCtrl.apiLogout)
router.route("/register")
    .post(winterCtrl.apiRegister)

/*router.route("/logout")
    .post(winterCtrl.apiLogout)
router.route("/register")
    .post(winterCtrl.apiRegister)*/
export default router