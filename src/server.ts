import express, { NextFunction, Request, Response,json } from 'express'
import router from './Routes/routes'
const app= express()

app.use(json())
app.use('/products', router)
app.use((err:Error, req:Request, res:Response, next:NextFunction)=>{
    res.json({Error:err.message})
})
app.listen(4003, ()=>{
console.log('App is Running');

})