const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;

const StaffSch = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "users",
    },
    phone: { type: String },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    login_time: {
      type: Date,
    },
    // role: {
    //   type: String,
    //   enum: ['admin', 'staff', 'faculty'],
    //   required: true,
    // },
    role: {
      type: String,
      enum: ['admin', 'staff', 'doctor'],
      required: true,
    },
    permissions: { // Updated with doctor, patient, and appointment read permissions
      type: [String],
      default: [ 
        "staff_read", 
        "academic_desk_read",
        "doctor_read", 
        "patient_read", 
        "appointment_read"
      ], // Default permissions
      required: true,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  { 
    strict: false, // Allows flexibility if any extra fields are added dynamically
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: "staffs" // MongoDB collection name
  }
);

module.exports = mongoose.model("staff", StaffSch);
