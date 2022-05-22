import dbConnect from "../../../util/dbConnect"
import mongoose from 'mongoose'

const Order=require('../../../models/Order')
export default async function handler(req, res) {

    await dbConnect();

    if(!mongoose.connections[0].readyState){
        return res.status(400).json({status:"errorbd"});

   }else{
     // check if user exists in db 
     const orders= await Order.find() // order by date ' plus récent '
    
   
  return res.status(201).json({orders: orders});
   }
    
  }