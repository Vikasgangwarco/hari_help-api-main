// Use: To store blood bank details
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ObjectId = Schema.ObjectId;

// const ObjectId = mongoose.Schema.ObjectId;
// const PatientSchema = new mongoose.Schema(


const bloodBankSchema = new Schema({
    user: { 
        type: ObjectId, 
        ref: "users",
        required: true
      },
      
      staff: {
        type: ObjectId,
        ref: "staff",
      },

    bloodBankName: { type: String, required: true },
    registrationNumber: { type: String, required: true },
    dateOfEstablishment: { type: Date, required: true },
    bloodBankType: { type: String, enum: ['Government', 'Private', 'NGO/Charitable', 'Other'], required: true },
    contactInformation: {
        bloodBankContactNumber: { type: String, required: true },
        emergencyContactNumber: { type: String },
        emailAddress: { type: String, required: true },
        website: { type: String }
    },
    address: {
        streetAddress: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    servicesOffered: {
        bloodComponentsAvailable: [{ type: String, enum: ['Whole Blood', 'Platelets', 'Plasma', 'Red Blood Cells (RBCs)', 'White Blood Cells (WBCs)', 'Other'] }],
        availableServices: [{ type: String, enum: ['Blood Donation Camps', '24/7 Emergency Services', 'Blood Collection and Storage', 'Home Blood Donation Pickup', 'Other'] }]
    },
    operatingHours: {
        daysOfOperation: [{ type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] }],
        operatingHours: { type: String, required: true }
    },
    keyContactPerson: {
        name: { type: String, required: true },
        positionTitle: { type: String, required: true },
        contactNumber: { type: String, required: true },
        emailAddress: { type: String, required: true }
    },
    bloodStockInformation: {
        bloodGroupsAvailable: [{
            type: String, 
            enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] , 
            required: true 
        }],
    },
    certificationsAndLicenses: {
        accreditationsCertifications: { type: String },
        licenseNumber: { type: String, required: true }
    },
    bankInformation: {
        bankName: { type: String, required: true },
        accountHolderName: { type: String, required: true },
        accountNumber: { type: String, required: true },
        ifscCode: { type: String, required: true },
        branchAddress: { type: String, required: true }
    },
    uploadDocuments: {
        bloodBankRegistrationCertificate: { type: String, required: true },
        proofOfAddress: { type: String, required: true },
        keyContactPhotoIDProof: { type: String, required: true },
        licenseDocument: { type: String, required: true },
        bloodBankExteriorPhoto: { type: String }
    },
    termsAndConditions: {
        informationAccuracy: { type: Boolean, required: true },
        agreeToTerms: { type: Boolean, required: true },
        consentToListing: { type: Boolean, required: true },
        signature: { type: String, required: true },
        date: { type: Date, required: true }
    },
    
},
{
    strict: false, // Allows flexibility if any extra fields are added dynamically
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: 'bloodBanks', // MongoDB collection name
  }
);

module.exports = mongoose.model('bloodBanks', bloodBankSchema);