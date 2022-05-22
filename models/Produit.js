import mongoose from 'mongoose'

const ProduitSchema = new mongoose.Schema({
  nom: String,
  prix:String,
  stockInitial:Number,
  stockRestant:Number
})

module.exports = mongoose.models.Produit || mongoose.model('Produit', ProduitSchema)