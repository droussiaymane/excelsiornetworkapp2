
import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema({
    customerNumber: {
        type: String
    },
    ribSource: {
        type: String
    },
    amount: {
        type: String
    },
    ribDestination:{
        type:String
    },
    creationDate:{
        type:String
    }

    
});

module.exports = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema)