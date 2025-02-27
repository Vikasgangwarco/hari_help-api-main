const mongoose = require("mongoose");
const patients = require("./patients");
const ObjectId = mongoose.Schema.ObjectId;

const AppointmentSch = new mongoose.Schema(
  {
    staff: {
      type: ObjectId,
      ref: "staff",
    },
    // patient: {
    //   type: ObjectId,
    //   ref: "patient",
    //   required: true
    // },
    patients:{
      type:[ObjectId],
      ref:"patients",
      default:[],
      required:true,
  },

  doctors:{
    type:[ObjectId],
    ref:"doctors",
    default:[],
    required:true,
},
    // doctor: {
    //   type: ObjectId,
    //   ref: "doctor",
    //   required: true
    // },

    // appointment_date: {
    //   type: Date,
    //   required: true
    // },
    appointment_request_date: {
      type: Date,
      required: true
    },
    appointment_approve_date: { //for doctor/admin to approve the appointment
      type: Date,
      
      
    },
    appointment_approve: { //for doctor/admin to approve the appointment
      type: Boolean,
      default: false,
      required: true
    },
    appointment_time: {
      type: String,
      enum: [
        "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM",
        "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", 
        "not provided"
      ],
      default: "not provided",
      required: true
    },
    // appointment_day: { type: String,
    //   enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Any-Day'],
    //    default: 'Any-Day', 
    //   required: true },
    appointment_type: {
      type: String,
      enum: ["in-person", "video", "phone"],
      default: "in-person",
      required: true
    },
    appointment_booking_mode: { //not necessary because it is online by admins also but in future if hospital/clinic book offline;
      type: String,
      enum: ["online", "offline"],
      default: "online",
      required: true
    },
    appointment_booking_number: {  //for doctor/admin to give the appointment_booking_number;  
      type: String,
      default: "not provided",
      required: true
    },
    appointment_payment: {
      type: Number,
      default: 500,
      required: true
    },

    payment_method: {
      type: String,
      enum: ["credit_card", "debit_card", "paypal", "cash", "upi", "net_banking", "not provided"],
      default: "not provided",
      required: true,
    },
    payment_transaction_id: {
      type: String, // To store payment transaction ID
      default: "",
      // required: true
    },
    payment_status: {
      type: String,
      enum: ["paid", "unpaid", "paid-offline"],
      default: "unpaid",
      required: true
    },

    status: {   //for doctor/admin to approve the appointment_status
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled",
      required: true
    },
    notes: {
      type: String, // Additional notes or description of the appointment
      default: "Description not provided",
      required: true
    },
    reason_for_visit: {
      type: String, // Reason why the patient is visiting the doctor
      default: "not mentioned reason",
      required: true
    },
    serialNumber: {
      type: Number,
      // required: true,
      // unique: true
    },
  },
  {
    timestamps: true,
    collection: "appointments"
  }
);



let Appointments = mongoose.model("appointments", AppointmentSch);




Appointments.addPatient=async function(appointmentId,patientId){
  console.log("adding patient ID: "+patientId+" to appointmentID: "+appointmentId);
  try{
      await Appointments.updateOne({_id:appointmentId},{$addToSet:{patients:patientId}});
      return true;
  }
  catch(err){
      console.log(err);
      return false;
  }
}

Appointments.removePatient=async function(appointmentId,patientId){
  try{
      await Appointments.updateOne({_id:appointmentId},{$pull:{patients:patientId}});
      return true;
  }
  catch(err){
      console.log(err);
      return false;
  }
}

Appointments.allPatients=async function(appointmentId){
  try{
      let data = await Appointments.findOne({_id:appointmentId},{patients:1}).populate("patients");
      console.log(data);
      return data.patients;
  }
  catch(err){
      console.log(err);
      return false;
  }
}

// // Pre-save hook to set the serialNumber
AppointmentSch.pre('save', async function(next) {
  if (this.isNew) {
    const lastAppointment = await mongoose.model('appointments').findOne().sort({ serialNumber: -1 });
    this.serialNumber = lastAppointment ? lastAppointment.serialNumber + 1 : 1;
  }
  next();
});


// module.exports = mongoose.model("appointments", AppointmentSch);
module.exports = Appointments;

