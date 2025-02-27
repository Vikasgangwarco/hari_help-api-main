const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const Doctors = require("../../databases/hari_center/doctors");
const Users = require("../../databases/system/users");
// const Patients = require("../../databases/hari_center/patients");
const Appointments = require('../../databases/hari_center/appointments');

const router = express.Router();






router.get("/doctor", async (req, res) => {
    try {
      let ret = {
        message:
          "Sorry you are not allowed to perform this task, permission denied.",
        status: "failed",
      };
      // Check if the authenticated user is a doctor
      if (req.user.role !== "doctor") {
        return res.status(403).json(ret);
      }
  
      const doctor = await Doctors.findById(req.user._id)
        .populate("appointment")
        // .populate('doctor')
        .lean();
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }
      // let ret={};
      ret.message = "Doctor found successfully";
      ret.status = "success";
      ret.data = [doctor];
      return res.status(200).json(ret);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
    return res.status(200).json(ret);
  });



  router.post("/doctor_delete", async (req, res, next) => {
    let ret = {
      message:
        "Sorry you are not allowed to perform this task, permission denied.",
      status: "failed",
    };
  
    // Check if the authenticated user is a doctor
    if (req.user.role !== "doctor") {
      return res.status(403).json(ret);
    }
  
    try {
      // Delete the patient
      console.log("req.user._id");
      console.log(req.user);
      console.log(req.user._id);
      await Doctors.deleteOne({ _id: req.user._id });
      ret.status = "success";
      ret.message = "Doctor deleted successfully";
    } catch (err) {
      console.log("some error occured:" + err);
      ret.message = err.message;
    }
    res.status(200).json(ret);
  });
  

  // router.post("/doctor_update", async (req, res, next) => {
  //   let ret = {
  //     message:
  //       "Sorry you are not allowed to perform this task, permission denied.",
  //     status: "failed",
  //   };
  //   let doctor = req.body;
  //   // Check if the authenticated user is a patient
  //   if (req.user.role !== "doctor") {
  //     return res.status(403).json(ret);
  //   }
  
  //   try {
  //     let updateFields =           
  //     { 
  //       // user: doctor.user,  //true
  //       // staff: doctor.staff,
  //       // hari_doctor: true,
  //       fullName: doctor.fullName,
  //           gender: doctor.gender,
  //           dateOfBirth: doctor.dateOfBirth,
  //           contactNumber: doctor.contactNumber,
  //           alternateNumber: doctor.alternateNumber,
  //           email: doctor.email,
  //           nationality: doctor.nationality,
  //           streetAddress: doctor.streetAddress,
  //           city: doctor.city,
  //           state: doctor.state,
  //           postalCode: doctor.postalCode,
  //           country: doctor.country,
  //           qualifications: doctor.qualifications,
  //           specialization: doctor.specialization,
  //           yearsOfExperience: doctor.yearsOfExperience,
  //           medicalRegistrationNumber: doctor.medicalRegistrationNumber,
  //           medicalLicense: doctor.medicalLicense,
  //           currentHospitalClinicName: doctor.currentHospitalClinicName,
  //           preferredConsultationMode: doctor.preferredConsultationMode,
  //           consultationDay: doctor.consultationDay,
  //           consultationTime: doctor.consultationTime,
  //           consultationFee: doctor.consultationFee,
  //           photoIdProof: doctor.photoIdProof,
  //           profilePhoto: doctor.profilePhoto,
  //           bankName: doctor.bankName,
  //           accountHolderName: doctor.accountHolderName,
  //           accountNumber: doctor.accountNumber,
  //           ifscCode: doctor.ifscCode,
  //           branchAddress: doctor.branchAddress,
  //           informationAccuracy: doctor.informationAccuracy,
  //           agreeToTerms: doctor.agreeToTerms,
  //           consentToUseProfile: doctor.consentToUseProfile,
  //           signature: doctor.signature,
  //           appointment: doctor.appointment,
  //           current_OPD_Number: doctor.current_OPD_Number,
    
  //   }
  
  //     // Update the patient
  //     console.log("req.user._id");
  
  //     console.log(req.user);
  //     console.log(req.user._id);
  //     const updatedDoctor = await Doctors.updateOne(
  //       { _id: req.user._id },
  //       { $set: updateFields }
  //     );
  //     ret.status = "success";
  //     ret.message = "Patient updated successfully";
  //     ret.data = updatedDoctor;
  //   } catch (err) {
  //     console.log("some error occured:" + err);
  //     ret.message = err.message;
  //   }
  //   res.status(200).json(ret);
  // });
  
  

  router.post("/doctor_update", async (req, res, next) => {
    let ret = {
        message: "Sorry you are not allowed to perform this task, permission denied.",
        status: "failed",
    };
    let doctor = req.body;
  const doctorId = req.user._id;  // Assuming doctor ID comes from authentication middleware


    // Check if the authenticated user is a doctor
    if (req.user.role !== "doctor") {
        return res.status(403).json(ret);
    }

    try {
        // Remove the _id field from the doctor object to avoid modifying the immutable field
        delete doctor._id;

        // Update the doctor
        console.log("req.user._id:", req.user._id);
        const updatedDoctor = await Doctors.updateOne(
            { _id: req.user._id },
            { $set: doctor },
            { runValidators: true }
        );

        if (updatedDoctor.nModified === 0) {
            ret.message = "No doctor found or no changes made";
            return res.status(404).json(ret);
        }
    // Retrieve the updated doctor data
    const updatedDoctorData = await Doctors.findById(doctorId);

        ret.status = "success";
        ret.message = "Doctor updated successfully";
        ret.data = updatedDoctorData;
    } catch (err) {
        console.log("some error occurred:", err);
        ret.message = err.message;
        return res.status(500).json(ret);
    }

    res.status(200).json(ret);
});

router.post("/doctor_update_current_opd_number", async (req, res, next) => {
  let ret = {
      message: "Sorry you are not allowed to perform this task, permission denied.",
      status: "failed",
  };
  let doctor = req.body;
const doctorId = req.user._id;  // Assuming doctor ID comes from authentication middleware


  // Check if the authenticated user is a doctor
  if (req.user.role !== "doctor") {
      return res.status(403).json(ret);
  }

  try {
      // Remove the _id field from the doctor object to avoid modifying the immutable field
      delete doctor._id;

      // Update the doctor
      console.log("req.user._id:", req.user._id);
      // let updateFields = {
      //   current_OPD_Number: doctor.current_OPD_Number,
      // };
      const updatedDoctor = await Doctors.updateOne(
          { _id: req.user._id },
          { $set: {current_OPD_Number: doctor.current_OPD_Number} },
          { runValidators: true }
      );

      if (updatedDoctor.nModified === 0) {
          ret.message = "No doctor found or no changes made";
          return res.status(404).json(ret);
      }
  // Retrieve the updated doctor data
  // const updatedDoctorData = await Doctors.findById(doctorId);
  const updatedDoctorData =await Doctors.findById(doctorId, 'current_OPD_Number'); // Only select the current_OPD_number field

      ret.status = "success";
      ret.message = "Doctor found current_OPD_number successfully";
      ret.data =  { current_OPD_Number: updatedDoctorData.current_OPD_Number };
  } catch (err) {
      console.log("some error occurred:", err);
      ret.message = err.message;
      return res.status(500).json(ret);
  }

  res.status(200).json(ret);
});


router.get("/doctor_current_opd_number", async (req, res) => { //this is not needs because already update opd with get
  try {
    let ret = {
      message: "Sorry you are not allowed to perform this task, permission denied.",
      status: "failed",
    };
    const doctorId = req.user._id;

    // Check if the authenticated user is a doctor
    if (req.user.role !== "doctor") {
      return res.status(403).json(ret);
    }

    const doctor = await Doctors.findById(doctorId, 'current_OPD_Number'); // Only select the current_OPD_number field
    
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    ret.message = "Doctor found current_OPD_number successfully";
    ret.status = "success";
    ret.data = { current_OPD_Number: doctor.current_OPD_Number };
    return res.status(200).json(ret);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});


// Route to get appointments for a specific doctor
router.get("/doctor_appointments", async (req, res, next) => {
  
  let ret = { status: "failed", message: "" };
  const doctorId = req.user._id;
  let skip = Number(req.query.skip) || 0;
  let limit = Number(req.query.limit) || 50;
  try {
    // Check if the authenticated user is a doctor
    if (req.user.role !== "doctor") {
      // return res.status(403).json(ret);
      return res.status(200).json(ret);

    }

    // Find appointments for the patient
    const appointments = await Appointments.find({ doctors: doctorId })
      .populate('patients','doctors')
      // .populate('doctors')
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    // Calculate serial numbers
        let totalAppointments = await Appointments.countDocuments({ doctors: doctorId });
      let  appointmentserial = appointments.map((appointment, index) => {
            appointment.serialNumber = totalAppointments - (skip + index);
            return appointment;
        });
    ret.status = "success";
    ret.message = "Appointments retrieved successfully";
    ret.data = appointmentserial;
  } catch (err) {
    console.log("Some error occurred:", err);
    ret.message = err.message;
    // return res.status(500).json(ret);
    return res.status(200).json(ret);

  }

  res.status(200).json(ret);
});
          
// router.post("/doctor_approve_appointment/:appointment_id", async (req, res, next) => {
//   let ret = { status: "failed", message: "" };
//   const appointmentData = req.body;
//   const doctorId = req.user._id;  // Assuming doctor ID comes from authentication middleware
//   const appointmentId = req.params.appointment_id;


//   try {
//     // Check if the authenticated user is a patient
//     if (req.user.role !== "doctor") {
//       ret.message = "Access forbidden: Only doctor can approve appointments.";
//       return res.status(403).json(ret);  // Return 403 Forbidden
//     }

//     // Validate that required appointment fields are provided
//     if (!appointmentId || !appointmentData.appointment_approve_date) {
//       ret.message = "Required fields missing (appointment_id or appointment_date).";
//       return res.status(400).json(ret);  // Return 400 Bad Request
//     }

//     // Find the existing appointment by ID
//     const appointment = await Appointments.findById(appointmentId);
//     if (!appointment) {
//       ret.message = "Appointment not found.";
//       return res.status(404).json(ret);  // Return 404 Not Found
//     }

//     // Check if the appointment belongs to the authenticated doctor
//     if (!appointment.doctors.includes(doctorId)) {
//       ret.message = "You are not authorized to approve this appointment.";
//       return res.status(403).json(ret);  // Return 403 Forbidden if the patient doesn't own the appointment
//     }

//     // Update the appointment with new data
//     appointment.appointment_approve_date = appointmentData.appointment_approve_date || appointment.appointment_approve_date;
//     appointment.appointment_time = appointmentData.appointment_time || appointment.appointment_time;
//     appointment.appointment_approve = appointmentData.appointment_approve || true;
//     appointment.reason_for_visit = appointmentData.reason_for_visit || appointment.reason_for_visit;
//     appointment.notes = appointmentData.notes || appointment.notes;

//     // Save the updated appointment
//     const updatedAppointment = await appointment.save();

//     ret.status = "success";
//     ret.message = "Appointment approved successfully";
//     ret.data = updatedAppointment;  // Optionally, you can return the updated appointment data
//     return res.status(200).json(ret);  // Return 200 OK

//   } catch (err) {
//     console.log("Some error occurred:", err);
//     ret.message = err.message || "An error occurred while updating the appointment.";
//     return res.status(500).json(ret);  // Return 500 Internal Server Error if an exception occurs
//   }
// });


router.post("/doctor_approve_appointment/:appointment_id", async (req, res, next) => {
  let ret = { status: "failed", message: "" };
  const appointmentData = req.body;
  const doctorId = req.user._id;  // Assuming doctor ID comes from authentication middleware
  const appointmentId = req.params.appointment_id;

  try {
    // Check if the authenticated user is a doctor
    if (req.user.role !== "doctor") {
      ret.message = "Access forbidden: Only doctors can approve appointments.";
      return res.status(403).json(ret);  // Return 403 Forbidden
    }

    // Validate that required appointment fields are provided
    if (!appointmentId || !appointmentData.appointment_approve_date) {
      ret.message = "Required fields missing (appointment_id or appointment_date).";
      return res.status(400).json(ret);  // Return 400 Bad Request
    }

    // Find the existing appointment by ID
    const appointment = await Appointments.findById(appointmentId);
    if (!appointment) {
      ret.message = "Appointment not found.";
      return res.status(404).json(ret);  // Return 404 Not Found
    }

    // Check if the appointment belongs to the authenticated doctor
    if (!appointment.doctors.includes(doctorId)) {
      ret.message = "You are not authorized to approve this appointment.";
      return res.status(403).json(ret);  // Return 403 Forbidden if the doctor doesn't own the appointment
    }
      // Set payment status based on the presence of a payment transaction ID
  appointmentData.payment_status = appointmentData.payment_transaction_id ? "paid" : "paid-offline";  
let updateFields = {
      appointment_approve_date: appointmentData.appointment_approve_date,
      appointment_time: appointmentData.appointment_time,
      appointment_approve: true,
      payment_transaction_id: appointmentData.payment_transaction_id,
      payment_status: appointmentData.payment_status,
      appointment_booking_number: appointmentData.appointment_booking_number,
      
      reason_for_visit: appointmentData.reason_for_visit,
      notes: appointmentData.notes
};
    // Update the appointment with new data
    const updatedAppointment = await Appointments.updateOne(
      { _id: appointmentId },
      {
        $set: 
          updateFields,
          // appointment_approve_date: appointmentData.appointment_approve_date,
          // appointment_time: appointmentData.appointment_time ,
          // appointment_approve: true,
          // reason_for_visit: appointmentData.reason_for_visit,
          // notes: appointmentData.notes
        
      },
      { runValidators: true }
    );

    if (updatedAppointment.nModified === 0) {
      ret.message = "No changes made to the appointment.";
      return res.status(400).json(ret);  // Return 400 Bad Request if no changes were made
    }

    // Retrieve the updated appointment
    const updatedAppointmentData = await Appointments.findById(appointmentId);

    ret.status = "success";
    ret.message = "Appointment approved successfully";
    ret.data = updatedAppointmentData;  // Optionally, you can return the updated appointment data
    return res.status(200).json(ret);  // Return 200 OK

  } catch (err) {
    console.log("Some error occurred:", err);
    ret.message = err.message || "An error occurred while updating the appointment.";
    return res.status(500).json(ret);  // Return 500 Internal Server Error if an exception occurs
  }
});


module.exports=router;








