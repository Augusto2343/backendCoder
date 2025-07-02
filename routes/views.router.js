import express from "express"
const viewRouter = express.Router();

 viewRouter.get("/", (req, res) =>{
      res.render("home");
 })
viewRouter.get("/realtimeproducts", (req,res) =>{
    res.render("realTimeProducts")
})
export default viewRouter