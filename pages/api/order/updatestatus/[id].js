


import dbConnect from "../../../../util/dbConnect"
import mongoose from 'mongoose'
const Order=require('../../../../models/Order')
export default async function handler(req, res) {
    const { id } = req.query

    await dbConnect();

    if(!mongoose.connections[0].readyState){
        return res.status(400).json({status:"errorbd"});

   }
 

    
    const newOrder= await Order.updateOne({ invoiceid: id },{status:"payé"})

   

      

     
     
    
  return res.status(201).json({order:newOrder});
  }
    
  
   