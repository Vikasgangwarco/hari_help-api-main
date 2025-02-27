const mongoose = require('mongoose');
const { Schema } = mongoose;

const ObjectId = Schema.ObjectId;

// const ObjectId = mongoose.Schema.ObjectId;
// const physiotherapySchema = new mongoose.Schema({

const physiotherapySchema = new Schema({
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
    centreName: { type: String, required: true },
    registrationNumber: { type: String, required: true },
    dateOfEstablishment: { type: Date, required: true },
    centreType: { type: String, required: true, enum: ['Physiotherapy Clinic', 'Rehabilitation Centre', 'Wellness Centre', 'Other'] },
    otherCentreType: { type: String },
    contactNumber: { type: String, required: true },
    emailAddress: { type: String, required: true },
    website: { type: String },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    servicesProvided: {
        specializations: { type: [String], required: true },
        availableServices: { type: [String], required: true }
    },
    centreTimings: {
        operatingDays: { type: [String], required: true },
        operatingHours: { type: String, required: true }
    },
    keyContactPerson: {
        name: { type: String, required: true },
        position: { type: String, required: true },
        contactNumber: { type: String, required: true },
        emailAddress: { type: String, required: true }
    },
    therapists: [{
        name: { type: String, required: true },
        specialization: { type: String, required: true },
        yearsOfExperience: { type: Number, required: true },
        consultationFee: { type: Number, required: true },
        availability: { type: String, required: true }
    }],
    bankInformation: {
        bankName: { type: String, required: true },
        accountHolderName: { type: String, required: true },
        accountNumber: { type: String, required: true },
        ifscCode: { type: String, required: true },
        branchAddress: { type: String, required: true }
    },
    documents: {
        registrationCertificate: { type: String, required: true },
        proofOfAddress: { type: String, required: true },
        keyContactPhotoId: { type: String, required: true },
        centreExteriorPhoto: { type: String }
    },
    termsAndConditions: {
        confirmation: { type: Boolean, required: true },
        agreement: { type: Boolean, required: true },
        consent: { type: Boolean, required: true },
        signature: { type: String, required: true },
        date: { type: Date, required: true }
    }
},
{
    strict: false,  // Allows flexibility if any extra fields are added dynamically
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: "physiotherapys"  // MongoDB collection name
  }
);

module.exports = mongoose.model('physiotherapys', physiotherapySchema);