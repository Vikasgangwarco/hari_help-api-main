// This file contains the schema for the hospitals collection in the MongoDB database
const mongoose = require('mongoose');
const { Schema } = mongoose;

// const ObjectId = mongoose.Schema.ObjectId;
const ObjectId = Schema.ObjectId;
// const hospitalSchema = new mongoose.Schema({

const hospitalSchema = new Schema({
    user: { 
        type: ObjectId, 
        ref: "users",
        required: true
      },
      staff: {
        type: ObjectId,
        ref: "staff",
      },
    hospitalName: { type: String, required: true },
    registrationNumber: { type: String, required: true },
    dateOfEstablishment: { type: Date, required: true },
    hospitalType: {
        type: String,
        enum: ['General Hospital', 'Specialty Hospital', 'Multi-Specialty Hospital', 'Other'],
        required: true
    },
    specialtyHospital: { type: String },
    otherHospitalType: { type: String },
    contactInformation: {
        hospitalContactNumber: { type: String, required: true },
        emergencyContactNumber: { type: String },
        emailAddress: { type: String, required: true },
        website: { type: String }
    },
    hospitalAddress: {
        streetAddress: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    hospitalServices: {
        specializationsOffered: { type: [String], required: true },
        availableServices: {
            inpatientServices: { type: Boolean, default: false },
            outpatientServices: { type: Boolean, default: false },
            emergencyServices: { type: Boolean, default: false },
            telemedicine: { type: Boolean, default: false },
            diagnosticServices: { type: Boolean, default: false },
            pharmacy: { type: Boolean, default: false },
            surgeryFacilities: { type: Boolean, default: false },
            icu: { type: Boolean, default: false },
            bloodBank: { type: Boolean, default: false },
            physiotherapy: { type: Boolean, default: false },
            dialysisUnit: { type: Boolean, default: false },
            otherServices: { type: String }
        }
    },
    hospitalTimings: { type: String, required: true },
    keyContactPerson: {
        name: { type: String, required: true },
        position: { type: String, required: true },
        contactNumber: { type: String, required: true },
        emailAddress: { type: String, required: true }
    },
    doctors: [{
        doctorName: { type: String, required: true },
        specialization: { type: String, required: true },
        yearsOfExperience: { type: Number, required: true },
        consultationFee: { type: Number, required: true },
        availability: { type: String, required: true }
    }],
    bedAvailability: {
        totalBeds: { type: Number, required: true },
        icuBeds: { type: Number, required: true },
        specialCareUnitBeds: { type: Number }
    },
    bankInformation: {
        bankName: { type: String, required: true },
        accountHolderName: { type: String, required: true },
        accountNumber: { type: String, required: true },
        ifscCode: { type: String, required: true },
        branchAddress: { type: String, required: true }
    },
    uploadDocuments: {
        registrationCertificate: { type: String, required: true },
        accreditationProof: { type: String, required: true },
        proofOfAddress: { type: String, required: true },
        keyContactPhotoID: { type: String, required: true },
        hospitalExteriorPhoto: { type: String }
    },
    termsAndConditions: {
        confirmation: { type: Boolean, required: true },
        agreement: { type: Boolean, required: true },
        consent: { type: Boolean, required: true },
        signature: { type: String, required: true },
        date: { type: Date, required: true }
    },
    current_OPD_Numbers:{
        type: String,
        required: true,
      },
},
{
    strict: false, // Allows flexibility if any extra fields are added dynamically
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: 'hospitals', // MongoDB collection name
  }
);

module.exports = mongoose.model('hospitals', hospitalSchema);