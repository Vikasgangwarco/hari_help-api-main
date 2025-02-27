// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const ObjectId = Schema.ObjectId;
// // const ObjectId = mongoose.Schema.ObjectId;
// // const DialysisSchema = new mongoose.Schema({

// const DialysisSchema = new Schema({
//     user: { 
//         type: ObjectId, 
//         ref: "users",
//         required: true
//       },
      
//       staff: {
//         type: ObjectId,
//         ref: "staff",
//       },
//     dialysisUnitName: { type: String, required: true },
//     registrationNumber: { type: String, required: true },
//     dateOfEstablishment: { type: Date, required: true },
//     dialysisUnitType: { 
//         type: String, 
//         enum: ['Hospital-based', 'Independent Clinic', 'Home Dialysis Service', 'Other'], 
//         required: true 
//     },
//     otherDialysisUnitType: { type: String },
//     contactInformation: {
//         dialysisUnitContactNumber: { type: String, required: true },
//         emergencyContactNumber: { type: String },
//         emailAddress: { type: String, required: true },
//         website: { type: String }
//     },
//     dialysisUnitAddress: {
//         streetAddress: { type: String, required: true },
//         city: { type: String, required: true },
//         state: { type: String, required: true },
//         postalCode: { type: String, required: true },
//         country: { type: String, required: true }
//     },
//     servicesOffered: {
//         dialysisTypesProvided: [{ 
//         type: String, 
//         enum: ['Hemodialysis', 'Peritoneal Dialysis', 'Home Hemodialysis', 'Continuous Renal Replacement Therapy (CRRT)', 'Other'],
//         required: true
//     }],
//         otherDialysisType: { type: String },
//         additionalServices: [{ 
//             type: String, 
//             enum: ['24/7 Emergency Dialysis', 'Online Consultation for Dialysis Management', 'Pre-dialysis Counseling', 'Diet and Nutrition Consultation', 'Other'] 
//         }],
//         otherAdditionalService: { type: String }
//     },
//     operatingHours: {
//         daysOfOperation: [{ type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] }],
//         operatingHours: { type: String }
//     },
//     keyContactPerson: {
//         name: { type: String, required: true },
//         positionTitle: { type: String, required: true },
//         contactNumber: { type: String, required: true },
//         emailAddress: { type: String, required: true }
//     },
//     dialysisUnitDetails: {
//         totalNumberOfDialysisMachines: { type: Number, required: true },
//         infectionControlMeasures: { type: String, required: true },
//         patientCapacityPerDay: { type: Number, required: true }
//     },
//     certificationsAndLicenses: {
//         accreditationsCertifications: { type: String },
//         licenseNumber: { type: String, required: true }
//     },
//     dialysisStaff: [{
//         name: { type: String, required: true },
//         qualification: { type: String, required: true },
//         specialization: { type: String, required: true },
//         yearsOfExperience: { type: Number, required: true }
//     }],
//     bankInformation: {
//         bankName: { type: String, required: true },
//         accountHolderName: { type: String, required: true },
//         accountNumber: { type: String, required: true },
//         ifscCode: { type: String, required: true },
//         branchAddress: { type: String, required: true }
//     },
//     uploadDocuments: {
//         dialysisUnitRegistrationCertificate: { type: String },
//         proofOfAddress: { type: String },
//         keyContactPhotoIDProof: { type: String },
//         licenseDocument: { type: String },
//         dialysisUnitPhoto: { type: String }
//     },
//     termsAndConditions: {
//         informationAccuracyConfirmation: { type: Boolean, required: true },
//         agreeToTerms: { type: Boolean, required: true },
//         consentToListing: { type: Boolean, required: true },
//         signature: { type: String, required: true },
//         date: { type: Date, required: true }
//     }
// },{
//     strict: false, // Allows flexibility if any extra fields are added dynamically
//     timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
//     collection: 'dialysis', // MongoDB collection name
//   }
// );

// module.exports = mongoose.model('dialysis', DialysisSchema);


const mongoose = require('mongoose');
const { Schema } = mongoose;

const ObjectId = Schema.ObjectId;

// Dialysis schema definition
const DialysisSchema = new Schema({
  // Reference to the user who created the dialysis unit
  user: { 
    type: ObjectId, 
    ref: "users",
    required: true
  },

  // Reference to staff associated with the dialysis unit
  staff: {
    type: ObjectId,
    ref: "staff",
  },

  // Dialysis unit details
  dialysisUnitName: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  dateOfEstablishment: { type: Date, required: true },
  dialysisUnitType: { 
    type: String, 
    enum: ['Hospital-based', 'Independent Clinic', 'Home Dialysis Service', 'Other'], 
    required: true 
  },
  otherDialysisUnitType: { type: String },

  // Contact information
  contactInformation: {
    dialysisUnitContactNumber: { type: String, required: true },
    emergencyContactNumber: { type: String },
    emailAddress: { type: String, required: true },
    website: { type: String }
  },

  // Dialysis unit address (supports full address)
  dialysisUnitAddress: {
    streetAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
  },

  // Services offered at the dialysis unit
  servicesOffered: {
    dialysisTypesProvided: [{ 
      type: String, 
      enum: ['Hemodialysis', 'Peritoneal Dialysis', 'Home Hemodialysis', 'Continuous Renal Replacement Therapy (CRRT)', 'Other'],
      required: true
    }],
    otherDialysisType: { type: String },
    additionalServices: [{ 
      type: String, 
      enum: ['24/7 Emergency Dialysis', 'Online Consultation for Dialysis Management', 'Pre-dialysis Counseling', 'Diet and Nutrition Consultation', 'Other'] 
    }],
    otherAdditionalService: { type: String }
  },

  // Operating hours for dialysis unit
  operatingHours: {
    daysOfOperation: [{ type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] }],
    operatingHours: { type: String }
  },

  // Key contact person for the dialysis unit
  keyContactPerson: {
    name: { type: String, required: true },
    positionTitle: { type: String, required: true },
    contactNumber: { type: String, required: true },
    emailAddress: { type: String, required: true }
  },

  // Dialysis unit specific details
  dialysisUnitDetails: {
    totalNumberOfDialysisMachines: { type: Number, required: true },
    infectionControlMeasures: { type: String, required: true },
    patientCapacityPerDay: { type: Number, required: true }
  },

  // Certifications and licenses related to the dialysis unit
  certificationsAndLicenses: {
    accreditationsCertifications: { type: String },
    licenseNumber: { type: String, required: true }
  },

  // Array of dialysis staff (each staff member can have their own qualifications and details)
  dialysisStaff: [{
    name: { type: String, required: true },
    qualification: { type: String, required: true },
    specialization: { type: String, required: true },
    yearsOfExperience: { type: Number, required: true }
  }],

  // Bank information for the dialysis unit
  bankInformation: {
    bankName: { type: String, required: true },
    accountHolderName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    ifscCode: { type: String, required: true },
    branchAddress: { type: String, required: true }
  },

  // Upload documents related to the dialysis unit (supports multiple documents)
  uploadDocuments: {
    dialysisUnitRegistrationCertificate: [{ type: String }],
    proofOfAddress: [{ type: String }],
    keyContactPhotoIDProof: [{ type: String }],
    licenseDocument: [{ type: String }],
    dialysisUnitPhoto: [{ type: String }]
  },

  // Terms and conditions agreement from the dialysis unit
  termsAndConditions: {
    informationAccuracyConfirmation: { type: Boolean, required: true },
    agreeToTerms: { type: Boolean, required: true },
    consentToListing: { type: Boolean, required: true },
    signature: { type: String, required: true },
    date: { type: Date, required: true }
  }
}, {
  strict: false,  // Allows flexibility in case of extra fields
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  collection: 'dialysis'  // Collection name in the MongoDB database
});

// Export the model
module.exports = mongoose.model('dialysis', DialysisSchema);
