import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({

  prixTotal:String,
  typePaiement:String,
  linkPaiment:String,
  invoiceid:String,
  status:String,
  date:Date
})

module.exports = mongoose.models.Order || mongoose.model('Order', OrderSchema)