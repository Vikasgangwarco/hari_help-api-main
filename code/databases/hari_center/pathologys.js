const mongoose = require('mongoose');
const { Schema } = mongoose;

// const ObjectId = mongoose.Schema.ObjectId;
const ObjectId = Schema.ObjectId;
// const LabSchema = new mongoose.Schema({

const LabSchema = new Schema({
    user: { 
        type: ObjectId, 
        ref: "users",
        required: true
      },
      staff: {
        type: ObjectId,
        ref: "staff",
      },
    labName: { type: String, required: true },
    labRegistrationNumber: { type: String, required: true },
    dateOfEstablishment: { type: Date, required: true },
    labType: { type: String, enum: ['Diagnostic Lab', 'Clinical Lab', 'Research Lab', 'Other'], required: true },
    otherLabType: { type: String },
    contactInformation: {
        labContactNumber: { type: String, required: true },
        emailAddress: { type: String, required: true },
        website: { type: String }
    },
    labAddress: {
        streetAddress: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    labServices: {
        typesOfTestsConducted: { type: [String], required: true },
        availableServices: {
            sampleCollectionAtLab: { type: Boolean, default: false },
            homeSampleCollection: { type: Boolean, default: false },
            onlineReportAccess: { type: Boolean, default: false },
            walkInAppointments: { type: Boolean, default: false },
            radiologyServices: { type: Boolean, default: false },
            otherServices: { type: String }
        }
    },
    operatingHours: {
        daysOfOperation: { type: [String], enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], required: true },
        operatingHours: { type: String, required: true }
    },
    keyContactPerson: {
        name: { type: String, required: true },
        positionTitle: { type: String, required: true },
        contactNumber: { type: String, required: true },
        emailAddress: { type: String, required: true }
    },
    certificationsAndAccreditations: {
        accreditationsCertifications: { type: [String], required: true }
    },
    labTechniciansStaff: [{
        name: { type: String, required: true },
        qualification: { type: String, required: true },
        specialization: { type: String, required: true },
        yearsOfExperience: { type: Number, required: true }
    }],
    bankInformation: {
        bankName: { type: String, required: true },
        accountHoldersName: { type: String, required: true },
        accountNumber: { type: String, required: true },
        ifscCode: { type: String, required: true },
        branchAddress: { type: String, required: true }
    },
    uploadDocuments: {
        labRegistrationCertificate: { type: String, required: true },
        proofOfAddress: { type: String, required: true },
        keyContactsPhotoIdProof: { type: String, required: true },
        labExteriorInteriorPhoto: { type: String }
    },
    termsAndConditions: {
        informationAccuracyConfirmation: { type: Boolean, required: true },
        agreeToTerms: { type: Boolean, required: true },
        consentToListing: { type: Boolean, required: true },
        signature: { type: String, required: true },
        date: { type: Date, required: true }
    },

    

},
{
    strict: false, // Allows flexibility if any extra fields are added dynamically
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: 'labs', // MongoDB collection name
  }

);

module.exports = mongoose.model('labs', LabSchema);