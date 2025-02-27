// const mongoose = require("mongoose");
// const ObjectId = mongoose.Schema.ObjectId;

// const DoctorSch = new mongoose.Schema(
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
//     specialty: {
//       type: String,
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
//     qualifications: {
//       type: [String], // Array of qualifications like MBBS, MD, etc.
//       default: []
//     },
//     clinic_address: {
//       type: String,
//       required: true
//     },
//     availability: {
//       type: String, // For example, "Mon-Fri, 9am - 5pm"
//       required: true
//     },
//     profile_picture: {
//       type: String, // URL or path to profile picture
//       default: ''
//     },
//     permissions: { // Specific permissions related to doctor resources
//       type: [String],
//       default: [
//         "doctor_read",
//         "patient_read",
//         "appointment_read", 
//         "appointment_create", 
//         "appointment_update"
//       ],
//       required: true
//     },
//     enabled: {
//       type: Boolean,
//       default: true
//     },
//     appointments: [{ // Array of appointments assigned to this doctor
//       type: ObjectId,
//       ref: "appointment"
//     }],
//   },
//   { 
//     strict: false,
//     timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
//     collection: "doctors"
//   }
// );

// module.exports = mongoose.model("doctor", DoctorSch);









// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const DoctorSchema = new Schema({
//   fullName: { type: String, required: true },
//   gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
//   dateOfBirth: { type: Date, required: true },
//   contactNumber: { type: String, required: true },
//   alternateNumber: { type: String },
//   emailAddress: { type: String, required: true },
//   nationality: { type: String, required: true },
//   medicalRegistrationNumber: { type: String, required: true },
//   specialization: { type: [String], required: true },  // Changed to array
//   qualifications: { type: [String], required: true },  // Changed to array
//   yearsOfExperience: { type: Number, required: true },
//   currentHospitalClinic: { type: String },
//   consultationFee: { type: Number, required: true },
//   professionalAddress: {
//     clinicHospitalName: { type: String, required: true },
//     streetAddress: { type: String, required: true },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     postalCode: { type: String, required: true },
//     country: { type: String, required: true }
//   },
//   availability: {
//     preferredConsultationMode: { type: [String], enum: ['In-person', 'Online', 'Home Visit', 'Both'], required: true },  // Changed to array
//     consultationTimings: [{
//       day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], required: true },
//       time: { type: String, required: true }
//     }]  // Changed to array of objects
//   },
//   uploadDocuments: {
//     medicalLicense: { type: [String], required: true },  // Changed to array
//     photoIdProof: { type: [String], required: true },  // Changed to array
//     profilePhoto: { type: [String], required: true }  // Changed to array
//   },
//   bankInformation: {
//     bankName: { type: String, required: true },
//     accountHolderName: { type: String, required: true },
//     accountNumber: { type: String, required: true },
//     ifscCode: { type: String, required: true },
//     branchAddress: { type: String, required: true }
//   },
//   termsAndConditions: {
//     informationAccuracy: { type: Boolean, required: true },
//     agreeToTerms: { type: Boolean, required: true },
//     consentToUseProfile: { type: Boolean, required: true }
//   },
//   signature: { type: String, required: true },
//   date: { type: Date, required: true },

//   permissions: { // Specific permissions related to doctor resources
//     type: [String],
//     default: [
//       "doctor_read",
//       "patient_read",
//       "appointment_read", 
//       "appointment_create", 
//       "appointment_update"
//     ],
//     required: true
//   },
//   enabled: {
//     type: Boolean,
//     default: true
//   },
//   appointments: [{ // Array of appointments assigned to this doctor
//     type: ObjectId,
//     ref: "appointment"
//   }],
// }, {
//   strict: false,
//   timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
//   collection: "doctors"
// });

// module.exports = mongoose.model("Doctor", DoctorSchema);
























// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// // const ObjectId = mongoose.Schema.ObjectId;
// const ObjectId = Schema.ObjectId;

// // const DoctorSchema = new mongoose.Schema(


// const DoctorSchema = new Schema(
//   {
//     user: { 
//       type: ObjectId, 
//       ref: "users",
//       required: true
//     },
//     staff: {
//       type: ObjectId,
//       ref: "staff",
//     },

//     // phone: {
//     //   //mobile student
//     //   type: String,
//     //   required: true,
//     // },

//     // Basic information
//     fullName: { type: String, required: true },
//     gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
//     dateOfBirth: { type: Date, required: true },
//     contactNumber: { type: String, required: true },
//     alternateNumber: { type: String },
//     emailAddress: { type: String, required: true },
//     nationality: { type: String, required: true },
//     medicalRegistrationNumber: { type: String, required: true },

//     // Professional information
//     specialization: { type: [String], required: true },  // Array of specializations
//     qualifications: { type: [String], required: true },  // Array of qualifications
//     yearsOfExperience: { type: Number, required: true },
//     currentHospitalClinic: { type: String },
//     consultationFee: { type: Number, required: true },

//     // Professional address
//     professionalAddress: {
//       clinicHospitalName: { type: String, required: true },
//       streetAddress: { type: String, required: true },
//       city: { type: String, required: true },
//       state: { type: String, required: true },
//       postalCode: { type: String, required: true },
//       country: { type: String, required: true },
//     },

//     // Availability for consultation
//     availability: {
//       preferredConsultationMode: { 
//         type: [String], 
//         enum: ['In-person', 'Online', 'Home Visit', 'Both'], 
//         required: true 
//       },  // Array for consultation modes (In-person, Online, etc.)
//       consultationTimings: [
//         {
//           day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], required: true },
//           time: { type: String, required: true },
//         },
//       ],  // Array of objects for consultation timings
//     },

//     // Documents for validation
//     uploadDocuments: {
//       medicalLicense: { type: [String], required: true },  // Array for medical license(s)
//       photoIdProof: { type: [String], required: true },   // Array for photo ID proof(s)
//       profilePhoto: { type: [String], required: true },   // Array for profile photo(s)
//     },

//     // Bank information
//     bankInformation: {
//       bankName: { type: String, required: true },
//       accountHolderName: { type: String, required: true },
//       accountNumber: { type: String, required: true },
//       ifscCode: { type: String, required: true },
//       branchAddress: { type: String, required: true },
//     },

//     // Terms and conditions agreement
//     termsAndConditions: {
//       informationAccuracy: { type: Boolean, required: true },
//       agreeToTerms: { type: Boolean, required: true },
//       consentToUseProfile: { type: Boolean, required: true },
//     },

//     // Signature and date of agreement
//     signature: { type: String, required: true },
//     date: { type: Date, required: true },

//     // Permissions related to the doctor (for system access control)
//     permissions: {
//       type: [String],
//       default: [
//         "doctor_read", 
//         "patient_read", 
//         "appointment_read", 
//         "appointment_create", 
//         "appointment_update",
//       ],
//       required: true,
//     },

//     // Enabled/Disabled flag for the doctor profile
//     enabled: { type: Boolean, default: true },

//     // Appointments assigned to this doctor (referencing an appointment model)
//     appointments: [{
//       type: ObjectId,
//       ref: 'appointments',  // Assuming 'Appointment' model is defined elsewhere
//     }],

//     current_OPD_Numbers:{
//       type: String,
//       required: true,
//     },
//   },
//   {
//     strict: false, // Allows flexibility if any extra fields are added dynamically
//     timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
//     collection: 'doctors', // MongoDB collection name
//   }
// );

// module.exports = mongoose.model('doctors', DoctorSchema);





// // import mongoose, { Types, model } from 'mongoose';


// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// // const ObjectId = mongoose.Schema.ObjectId;
// const ObjectId = Schema.ObjectId;

// // const DoctorSchema = new mongoose.Schema(


// const DoctorSchema = new Schema(
//   {
//     user: { 
//       type: ObjectId, 
//       ref: "users",
//       required: true
//     },
//     staff: {
//       type: ObjectId,
//       ref: "staff",
//     },

//     // phone: {
//     //   //mobile student
//     //   type: String,
//     //   required: true,
//     // },

//     hari_doctor_id: {
//       type: String,
//     },
      
//     hari_doctor: {
//       type: Boolean,
//       required: true,
//       default: false,
//     },

//     // Basic information
//     fullName: { type: String, required: true },
//     gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
//     dateOfBirth: { type: Date, required: true },
//     contactNumber: { type: String, required: true },
//     alternateNumber: { type: String },
//     emailAddress: { type: String, required: true },
//     nationality: { type: String, required: true },
//     medicalRegistrationNumber: { type: String, required: true },

//     // Professional information
//     specialization: { type: [String], required: true },  // Array of specializations
//     qualifications: { type: [String], required: true },  // Array of qualifications
//     yearsOfExperience: { type: Number, required: true },
//     currentHospitalClinic: { type: String },
//     consultationFee: { type: Number, required: true },

//     // Professional address
//     // professionalAddress: {
//       clinicHospitalName: { type: String, required: true },
//       streetAddress: { type: String, required: true },
//       city: { type: String, required: true },
//       state: { type: String, required: true },
//       postalCode: { type: String, required: true },
//       country: { type: String, required: true },
//     // },

//     // Availability for consultation
//     // availability: {
//       preferredConsultationMode: { 
//         type: [String], 
//         enum: ['In-person', 'Online', 'Home-Visit', 'Any-Option'], 
//         required: true 
//       },  // Array for consultation modes (In-person, Online, etc.)
//       consultationTimings: [
//         {
//           day: { type: String,
//                  enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], 
//                  required: true },
//           // time: { type: String, required: true },
//         },
//       ],  // Array of objects for consultation timings
//     // },
//     date: { type: Date, required: true },
//     time: { type: String, required: true },

//     // Documents for validation
//     // uploadDocuments: {
//       medicalLicense: { type: [String], required: true },  // Array for medical license(s)
//       photoIdProof: { type: [String], required: true },   // Array for photo ID proof(s)
//       profilePhoto: { type: [String], required: true },   // Array for profile photo(s)
//     // },

//     // Bank information
//     // bankInformation: {
//       bankName: { type: String, required: true },
//       accountHolderName: { type: String, required: true },
//       accountNumber: { type: String, required: true },
//       ifscCode: { type: String, required: true },
//       branchAddress: { type: String, required: true },
//     // },

//     // Terms and conditions agreement
//     // termsAndConditions: {
//       informationAccuracy: { type: Boolean, required: true },
//       agreeToTerms: { type: Boolean, required: true },
//       consentToUseProfile: { type: Boolean, required: true },
//     // },

//     // Signature and date of agreement
//     signature: { type: String, required: true },
//     date: { type: Date, required: true },

//     // Permissions related to the doctor (for system access control)
//     permissions: {
//       type: [String],
//       default: [
//         "doctor_read", 
//         "patient_read", 
//         "appointment_read", 
//         "appointment_create", 
//         "appointment_update",
//       ],
//       required: true,
//     },

//     permission_id: {
//       type: ObjectId,
//       default: new mongoose.Types.ObjectId(),
//       required: true,
//     },

//     // Enabled/Disabled flag for the doctor profile
//     enabled: { type: Boolean, default: true },

//     // Appointments assigned to this doctor (referencing an appointment model)
//     appointment: [{
//       type: ObjectId,
//       ref: 'appointments',  // Assuming 'Appointment' model is defined elsewhere
//     }],

//     current_OPD_Number:{
//       type: String,
//       required: true,
//     },
//     serialNumber: {
//       type: Number,
//       // required: true,
//       unique: true
//     },
//   },
//   {
//     strict: false, // Allows flexibility if any extra fields are added dynamically
//     timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
//     collection: 'doctors', // MongoDB collection name
//   }
// );


// // Pre-save hook to set the serialNumber
// DoctorSchema.pre('save', async function(next) {
//   if (this.isNew) {
//     const lastDoctor = await mongoose.model('doctors').findOne().sort({ serialNumber: -1 });
//     this.serialNumber = lastDoctor ? lastDoctor.serialNumber + 1 : 1;
//   }
//   next();
// });

// module.exports = mongoose.model('doctors', DoctorSchema);








// import mongoose, { Types, model } from 'mongoose';


const mongoose = require('mongoose');
const { Schema } = mongoose;

// const ObjectId = mongoose.Schema.ObjectId;
const ObjectId = Schema.ObjectId;

// const DoctorSchema = new mongoose.Schema(


const DoctorSchema = new Schema(
  {
    user: { 
      type: ObjectId, 
      ref: "users",
      required: true
    },
    staff: {
      type: ObjectId,
      ref: "staff",
    },

    // phone: {
    //   type: String,
    //   required: true,
    // },

    hari_doctor_id: {
      type: String,
    },
      
    hari_doctor: {
      type: Boolean,
      required: true,
      default: false,
    },

    // Basic information
    fullName: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    dateOfBirth: { type: Date, required: true },
    contactNumber: { type: String, required: true },
    alternateNumber: { type: String },
    email: { type: String, required: true },
    nationality: { type: String, required: true },

    // Professional information
    // specialization: { type: [String], required: true },  // Array of specializations
    // qualifications: { type: [String], required: true },  // Array of qualifications
    // yearsOfExperience: { type: Number, required: true },
    // currentHospitalClinic: { type: String },
    // consultationFee: { type: Number, required: true },

    // consultationFee: { type: Number, required: true },


    // Professional address
    // professionalAddress: {
      // clinicHospitalName: { type: String, required: true },
      streetAddress: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    // },


    specialization: { type: [String], required: true },  // Array of specializations
    qualifications: { type: [String], required: true },  // Array of qualifications
    yearsOfExperience: { type: Number, required: true },
    medicalRegistrationNumber: { type: String, required: true },
    currentHospitalClinicName: { type: String, required: true },

    // Availability for consultation
    // availability: {
      preferredConsultationMode: { 
        type: [String], 
        enum: ['In-person', 'Online', 'Home-Visit', 'Any-Option'],
        default: 'Any-Option', 
        required: true 
      },  // Array for consultation modes (In-person, Online, etc.)
      // consultationTimings: [
        // {
          consultationDay: { type: String,
                 enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Any-Day'],
                  default: 'Any-Day', 
                 required: true },
          // time: { type: String, required: true },
        // },
      // ],  // Array of objects for consultation timings
    // },
    consultationDate: { type: Date,  default: Date.now, required: true },
    consultationTime: { type: String, default: 'Any-Time', required: true },
    consultationFee:  { type: Number, default: 500, required: true },

    // Documents for validation
    // uploadDocuments: {
      medicalLicense: { type: [String], },  // Array for medical license(s)
      photoIdProof: { type: [String], },   // Array for photo ID proof(s)
      profilePhoto: { type: [String], },   // Array for profile photo(s)
    // },

    // Bank information
    // bankInformation: {
      bankName: { type: String,  },
      accountHolderName: { type: String,  },
      accountNumber: { type: String,  },
      ifscCode: { type: String, },
      branchAddress: { type: String, },
    // },

    // Terms and conditions agreement
    // termsAndConditions: {
      informationAccuracy: { type: Boolean, },
      agreeToTerms: { type: Boolean,  },
      consentToUseProfile: { type: Boolean, },
    // },

    // Signature and date of agreement
    signature: { type: String,  },
    // date: { type: Date, required: true },

    // Permissions related to the doctor (for system access control)
    permissions: {
      type: [String],
      default: [
        "doctor_read", 
        "patient_read", 
        "appointment_read", 
        "appointment_create", 
        "appointment_update",
      ],
      required: true,
    },

    permission_id: {
      type: ObjectId,
      default: new mongoose.Types.ObjectId(),
      required: true,
    },

    // Enabled/Disabled flag for the doctor profile
    enabled: { type: Boolean, default: true },

    // Appointments assigned to this doctor (referencing an appointment model)
    appointment: [{
      type: ObjectId,
      ref: 'appointments',  // Assuming 'Appointment' model is defined elsewhere
    }],

    // current_OPD_Number:{
    //   type: String,
    //   default: 'OPD-001',
    //   // required: true,
    // },

    current_OPD_Number:{
      type: Number,
      default: 0,
      // required: true,
    },
    
    serialNumber: {
      type: Number,
      // required: true,
      
    },
  },
  {
    strict: false, // Allows flexibility if any extra fields are added dynamically
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: 'doctors', // MongoDB collection name
  }
);


// Pre-save hook to set the serialNumber
DoctorSchema.pre('save', async function(next) {
  if (this.isNew) {
    const lastDoctor = await mongoose.model('doctors').findOne().sort({ serialNumber: -1 });
    this.serialNumber = lastDoctor ? lastDoctor.serialNumber + 1 : 1;
  }
  next();
});

module.exports = mongoose.model('doctors', DoctorSchema);
