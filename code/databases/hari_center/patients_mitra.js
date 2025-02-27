const mongoose = require('mongoose');
const { Schema } = mongoose;

// const ObjectId = mongoose.Schema.ObjectId;
const ObjectId = Schema.ObjectId;
// const patientMitraSchema = new mongoose.Schema({


const patientMitraSchema = new Schema({
    user: { 
        type: ObjectId, 
        ref: "users",
        required: true
      },
      staff: {
        type: ObjectId,
        ref: "staff",
      },
    personalInformation: {
        fullName: { type: String, required: true },
        gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
        dateOfBirth: { type: Date, required: true },
        contactNumber: { type: String, required: true },
        emailAddress: { type: String, required: true },
        nationality: { type: String, required: true },
        currentAddress: {
            streetAddress: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true }
        },
        permanentAddress: {
            streetAddress: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true }
        }
    },
    professionalInformation: {
        educationQualifications: { type: String, required: true },
        languagesSpoken: { type: [String], required: true },
        previousExperience: { type: String },
        availability: {
            days: { type: [String], enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], required: true },
            hours: { type: String, required: true }
        }
    },
    skills: {
        communicationSkills: { type: String, enum: ['Excellent', 'Good', 'Average'], required: true },
        technicalSkills: { type: String, enum: ['Excellent', 'Good', 'Average'], required: true }
    },
    preferredModeOfAssistance: { type: String, enum: ['In-person', 'Telephonic'], required: true },
    bankInformation: {
        bankName: { type: String, required: true },
        accountHolderName: { type: String, required: true },
        accountNumber: { type: String, required: true },
        ifscCode: { type: String, required: true },
        branchAddress: { type: String, required: true }
    },
    uploadDocuments: {
        idProof: { type: String, required: true },
        addressProof: { type: String, required: true },
        qualificationCertificate: { type: String },
        profilePhoto: { type: String, required: true },
        characterCertificate: { type: String, required: true }
    },
    references: {
        reference1: { type: String, required: true },
        reference2: { type: String, required: true }
    },
    termsAndConditions: {
        confirmation: { type: Boolean, required: true },
        agreement: { type: Boolean, required: true },
        consent: { type: Boolean, required: true },
        signature: { type: String, required: true },
        date: { type: Date, required: true }
    },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], required: true },
},
{
    strict: false, // Allows flexibility if any extra fields are added dynamically
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: 'patientMitras', // MongoDB collection name
  });

module.exports = mongoose.model('patientMitras', patientMitraSchema);