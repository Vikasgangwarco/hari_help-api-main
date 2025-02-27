const mongoose = require('mongoose');
const { Schema } = mongoose;

const ObjectId = Schema.ObjectId;

// const ObjectId = mongoose.Schema.ObjectId;
// const receiptSchema = new mongoose.Schema({


const receiptSchema = new Schema({

     // User reference (linked to user collection)
    user: { 
            type: ObjectId, 
            ref: "users", 
            required: true 
          },
      
    staff: {
            type: ObjectId,
            ref: "staff",
          },

    doctorName: {
        type: String,
        required: true
    },
    patientName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    services: [{
        description: String,
        cost: Number
    }],
    totalAmount: {
        type: Number,
        required: true
    }
},
{
    strict: false,  // Allows flexibility if any extra fields are added dynamically
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: "receipts"  // MongoDB collection name
  }
);

const Receipt = mongoose.model('receipts', receiptSchema);

module.exports = Receipt;