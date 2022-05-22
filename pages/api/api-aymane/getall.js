import dbConnect from "../../../util/dbConnect"
import mongoose from 'mongoose'

const Transaction=require('../../../models/Transaction')
export default async function handler(req, res) {

    await dbConnect();

    if(!mongoose.connections[0].readyState){
        return res.status(400).json({status:"errorbd"});

   }else{
     // check if user exists in db 
     const transactions= await Transaction.find() // order by date ' plus récent '
     
   
  return res.status(201).json({transactions:transactions});
   }
    
  }