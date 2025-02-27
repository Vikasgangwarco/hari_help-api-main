// const mongoose = require("mongoose");
// const ObjectId = mongoose.Schema.ObjectId;

// const PatientSch = new mongoose.Schema(
//   {
//     user: { 
//       type: ObjectId, 
//       ref: "users" 
//     },
//     first_name: {
//       type: String,
//       required: true
//     },
//     last_name: {
//       type: String,
//       required: true
//     },
//     date_of_birth: {
//       type: Date,
//       required: true
//     },
//     gender: {
//       type: String,
//       enum: ['male', 'female', 'other'],
//       required: true
//     },
//     phone: {
//       type: String,
//       required: true
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true
//     },
//     address: {
//       type: String,
//       required: true
//     },
//     medical_history: {
//       type: String, // This could be a long text of past conditions or an array of diagnoses
//       default: ''
//     },
//     allergies: {
//       type: [String], // Array of known allergies (e.g., "Penicillin", "Peanuts")
//       default: []
//     },
//     current_medications: {
//       type: [String], // Array of current medications
//       default: []
//     },
//     emergency_contact: {
//       name: {
//         type: String,
//         required: true
//       },
//       relationship: {
//         type: String,
//         required: true
//       },
//       phone: {
//         type: String,
//         required: true
//       }
//     },
//     assigned_doctor: { // Reference to the doctor assigned to the patient
//       type: ObjectId,
//       ref: "doctor"
//     },
//     appointments: [{
//       type: ObjectId,
//       ref: "appointment"
//     }],
//     profile_picture: {
//       type: String, // URL or path to profile picture
//       default: ''
//     },
//     enabled: {
//       type: Boolean,
//       default: true
//     },
//   },
//   { 
//     strict: false,
//     timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
//     collection: "patients"
//   }
// );

// module.exports = mongoose.model("patient", PatientSch);
































// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// // const ObjectId = mongoose.Schema.ObjectId;
// const ObjectId = Schema.ObjectId;

// // const PatientSchema = new mongoose.Schema(


// const PatientSchema = new Schema({
//   user: { 
//     type: ObjectId, 
//     ref: "users",
//     required: true
//   },
//   fullName: { type: String, required: true },
//   gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
//   dateOfBirth: { type: Date, required: true },
//   contactNumber: { type: String, required: true },
//   emailAddress: { type: String, required: true },
//   nationality: { type: String, required: true },
//   address: {
//     streetAddress: { type: String, required: true },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     postalCode: { type: String, required: true },
//     country: { type: String, required: true }
//   },
//   medicalInformation: {
//     bloodGroup: { type: String, required: true },
//     allergies: { type: String },
//     chronicConditions: { type: String },
//     currentMedications: { type: String },
//     emergencyContactName: { type: String, required: true },
//     emergencyContactNumber: { type: String, required: true }
//   },
//   preferredConsultationMode: { 
//     type: String, 
//     enum: ['In-person', 'Online Consultation', 'Home Visit', 'All The Above'], 
//     required: true 
//   },
//   healthInsuranceInformation: {
//     insuranceProvider: { type: String },
//     insuranceIdPolicyNumber: { type: String }
//   },
//   accountSecurity: {
//     createPassword: { type: String, required: true },
//     confirmPassword: { type: String, required: true }
//   },
//   termsAndConditions: {
//     informationAccuracy: { type: Boolean, required: true },
//     agreeToTerms: { type: Boolean, required: true },
//     consentToUseInformation: { type: Boolean, required: true }
//   },
//   signature: { type: String },
//   date: { type: Date, required: true },
//   appointments: [{
//     type: ObjectId,
//     ref: "appointments"
//   }],
// }, {
//   strict: false,
//   timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
//   collection: "patients"
// });

// module.exports = mongoose.model("patients", PatientSchema);


















const mongoose = require('mongoose');
const { Schema } = mongoose;

const ObjectId = Schema.ObjectId;

// const ObjectId = mongoose.Schema.ObjectId;
// const PatientSchema = new mongoose.Schema(


const PatientSchema = new Schema(
  {
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

    hari_patient_id: {
      type: String,
    },
      
    hari_patient: {
      type: Boolean,
      required: true,
      default: false,
    },
    // phone: {
    //   //mobile patient
    //   type: String,
    //   required: true,
    // },

    guardian_phone: {
      type: String,
    },
    phone_office: {
      type: String,
    },
    phone_residence: {
      type: String,
    },

    patient_picture: {
      type: String,
    },

    // Basic Patient Information
    // fullName: { type: String, required: true },
    fullName: { type: String, default: 'Patient-name', required: true },

    // gender: { 
    //   type: String, 
    //   enum: ['Male', 'Female', 'Other'], 
    //   required: true 
    // },
    gender: { 
      type: String, 
      enum: ['Male', 'Female', 'Other'],
      default: 'Other', 
      required: true 
    },
    // dateOfBirth: { type: Date, required: true },
    // contactNumber: { type: String, required: true },
    // emergencyContactNumber: { type: String, required: true },
    // emailAddress: { type: String, required: true },
    // nationality: { type: String, required: true },

    dateOfBirth: { type: Date, default: "2000-01-01",required: true },
    // dateOfBirth: { type: String, default: "2000-01-01",required: true },

    contactNumber: { type: String, required: true },
    emergencyContactNumber: { type: String, default:"pppppppppp",required: true },
    emailAddress: { type: String, default:"patient@gmail.com",required: true },
    nationality: { type: String, default:"Indian", required: true },


    // // Address Information
    // address: {
    //   streetAddress: { type: String, required: true },
    //   city: { type: String, required: true },
    //   // state: { type: String, required: true },
    //   state: { type: String },

    //   // postalCode: { type: String, required: true },
    //   postalCode: { type: String},

    //   country: { type: String, required: true }

    //   // country: { type: String }

    // },

        // Address Information
        // address: {
          // streetAddress: { type: String, required: true },
          streetAddress: { type: String},

          // city: { type: String, required: true },
          city: { type: String},

          // state: { type: String, required: true },
          state: { type: String },
    
          // postalCode: { type: String, required: true },
          postalCode: { type: String},
    
          // country: { type: String, required: true }
    
          country: { type: String },
    
        // },

    // Medical Information (allowing arrays for multiple conditions and medications)
    // medicalInformation: {
      // bloodGroup: { type: String, required: true },
      bloodGroup: { type: String },

      allergies: { type: [String] },    // Changed to array of strings
      medicalHistory: { type: [String], default: [] },  // Changed to array of strings
      chronicConditions: { type: [String],default: [] },  // Changed to array of strings
      currentMedications: { type: [String], default: [] },  // Changed to array of strings
      // emergencyContactName: { type: String, required: true },
       emergencyStreetAddress: { type: String },
       emergencyContactName: { type: String},

    // },

    // // Preferred Consultation Mode (keeping as a single option, can also be an array if you want flexibility)
    // preferredConsultationMode: { 
    //   type: String, 
    //   enum: ['In-person', 'Online Consultation', 'Home Visit', 'All The Above'], 
    //   required: true 
    // },


       // Preferred Consultation Mode (keeping as a single option, can also be an array if you want flexibility)
       preferredConsultationMode: { 
        type: String, 
        enum: ['In-person', 'Online Consultation', 'Telephonic Consultation', 'Home Visit', 'All The Above'], 
        default: 'All The Above',
        required: true 
      },
  

    // Health Insurance Information (insurance may have multiple providers or policies in some cases)
    // healthInsuranceInformation: {
      insuranceProvider: { type: String },
      insuranceIdPolicyNumber: { type: String },
    // },

    // Account Security - password fields
    // accountSecurity: {
    //   createPassword: { type: String, required: true },
    //   confirmPassword: { type: String, required: true }
    // },

    // Terms and Conditions
    // termsAndConditions: {
      // informationAccuracy: { type: Boolean, required: true },
      informationAccuracy: { type: Boolean, },

      // agreeToTerms: { type: Boolean, required: true },
      agreeToTerms: { type: Boolean },

      // consentToUseInformation: { type: Boolean, required: true },
      consentToUseInformation: { type: Boolean},

    // },

    // Patient Signature (can be used for electronic signature or reference)
    signature: { type: String },

    // Date of registration or acceptance of terms
    date: { type: Date, default: Date.now, required: true },
    time: { type: String, default: "4:00 PM",required: true },

    // date: { type: Date, },
    // time: { type: Date, },

    // Appointments (linking to appointments collection, allowing multiple appointments)
    appointment: [{
      type: ObjectId,
      ref: "appointments"
    }],
    permission_id: {
      type: ObjectId,
      default: new mongoose.Types.ObjectId(),
      required: true,
    },
    enabled: {
      type: Boolean,
      required: true,
      default: true,
    },
    serialNumber: {
      type: Number,
      // required: true,
      // unique: true
    },
    referralCode: {
      type: String,
      default: '',
      // unique: true
    }
  },
  {
    strict: false,  // Allows flexibility if any extra fields are added dynamically
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: "patients"  // MongoDB collection name
  }
);


// Pre-save hook to set the serialNumber
PatientSchema.pre('save', async function(next) {
  if (this.isNew) {
    const lastPatient = await mongoose.model('patients').findOne().sort({ serialNumber: -1 });
    this.serialNumber = lastPatient ? lastPatient.serialNumber + 1 : 1;
  }
  next();
});

// Method to format dateOfBirth to dd-mm-yyyy
PatientSchema.methods.formatDateOfBirth = function() {
  const date = this.dateOfBirth;
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};


module.exports = mongoose.model("patients", PatientSchema);  // Export the model
