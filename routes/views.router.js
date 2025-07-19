import express from "express"
const viewRouter = express.Router();

 viewRouter.get("/", (req, res) =>{
      res.render("home");
 })
viewRouter.get("/products", (req,res) =>{
    res.render("products")
})
export default viewRouter