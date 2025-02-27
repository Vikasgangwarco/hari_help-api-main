const mongoose = require('mongoose');
const { Schema } = mongoose;

const ObjectId = Schema.ObjectId;
// const ObjectId = mongoose.Schema.ObjectId;


// const clinicSchema = new mongoose.Schema({
const clinicSchema = new Schema({
    user: { 
        type: ObjectId, 
        ref: "users",
        required: true
      },
      
      staff: {
        type: ObjectId,
        ref: "staff",
      },
      
    clinicName: { type: String, required: true },
    registrationNumber: { type: String, required: true },
    dateOfEstablishment: { type: Date, required: true },
    clinicType: {
        type: String,
        enum: ['General Practice', 'Specialty', 'Multi-Specialty', 'Other'],
        required: true
    },
    specialty: { type: String },
    otherClinicType: { type: String },
    contactInformation: {
        clinicContactNumber: { type: String, required: true },
        emailAddress: { type: String, required: true },
        website: { type: String }
    },
    clinicAddress: {
        streetAddress: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    clinicServices: {
        specializationsOffered: { type: [String], required: true },
        availableServices: {
            inPersonConsultations: { type: Boolean, default: false },
            telemedicineServices: { type: Boolean, default: false },
            diagnosticTests: { type: Boolean, default: false },
            pharmacy: { type: Boolean, default: false },
            emergencyServices: { type: Boolean, default: false },
            otherServices: { type: String }
        }
    },
    clinicTimings: {
        operatingDays: { type: [String], required: true },
        operatingHours: { type: String, required: true }
    },
    keyContactPerson: {
        name: { type: String, required: true },
        positionTitle: { type: String, required: true },
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
    bankInformation: {
        bankName: { type: String, required: true },
        accountHolderName: { type: String, required: true },
        accountNumber: { type: String, required: true },
        ifscCode: { type: String, required: true },
        branchAddress: { type: String, required: true }
    },
    uploadDocuments: {
        clinicRegistrationCertificate: { type: String, required: true },
        proofOfAddress: { type: String, required: true },
        keyContactPhotoIdProof: { type: String, required: true },
        clinicExteriorPhoto: { type: String }
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
    collection: 'clinics', // MongoDB collection name
  }
);

module.exports = mongoose.model('clinics', clinicSchema);