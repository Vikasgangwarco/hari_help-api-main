//module imports
const express = require("express");
const router = express.Router(); // route : {root}/shopping/

//local imports
const Verifications = require("../../../databases/system/verifications.js");
const Users = require("../../../databases/system/users.js");
const Doctors = require("../../../databases/hari_center/doctors.js");
const {sendOtp} = require("../../../utility/connectivity_functions.js");

router.post("/send_otp", async (req, res, next) => {
    var ret= {status:"failed",message:""};
    console.log("checking inside send otp");
    // var destination_type = "phone";
    let contact = req.body.phone;
    console.log("number:"+contact);
    let signature = req.body.signature;

    console.log("signature:"+signature);

    try{
        // if(!contact || !signature){
        //     throw {message:"contact or signature missing"};
        // }
        if(!contact){
            // throw {message:"contact or signature missing"};
            throw {message:"contact missing"};

        }
        let v = await Verifications.addVerification(contact,"phone",signature);
        sendOtp(v.contact,v.one_time_password,v.signature);
        if(v)
        {
            
            ret.status = "success";
            ret.message = "otp sent successfully to: "+contact;
            // ret.otp = v.one_time_password;
            ret.data = v._id;
        }
        else{
            ret.message="Could not create OTP entry. Please try again";
        }
    }
    catch(err)
    {
        ret.message = err.message;
        console.log(err);
    }
    res.status(200).json(ret);
});




// Doctor Registration Route (POST /doctor_register)
// router.post("/doctor_register_otp", async (req, res, next) => {
//     let ownerId = req.user._id;  // assuming the owner ID is available through authentication
//     let doctor = req.body;

//     let ret = { message: "Sorry, you are not allowed to perform this task, permission denied.", status: "failed" };

//     if (!doctor.contactNumber) {
//         ret.message = "Phone number is required";
//         return res.status(400).json(ret);
//     }

//     try {
//         // Check if a doctor with the same phone number already exists
//         let existingDoctor = await Doctors.findOne({ contactNumber: doctor.contactNumber });
        
//         if (existingDoctor) {
//             // If the doctor is already registered, send OTP for login
//             let verification = await Verifications.addVerification(doctor.contactNumber, "phone", "doctor_login");

//             // Send OTP to the phone
//             sendOtp(verification.contact, verification.one_time_password, verification.signature);

//             ret.status = "success";
//             ret.message = "Doctor already registered. OTP sent for login.";
//             ret.data = existingDoctor._id;  // Returning the existing doctor's ID
//             return res.status(200).json(ret);
//         }

//         // If the doctor is not already registered, proceed with registration
//         let user = await Users.findOne({ phone: doctor.contactNumber });
//         if (!user) {
//             user = new Users({ phone: doctor.contactNumber });
//             await user.save();
//         }

//         doctor.user = user._id;
//         doctor.staff = ownerId;  // Assigning the owner (staff) to the doctor

//         let newDoctor = new Doctors({
//             user: doctor.user,
//             staff: doctor.staff,
//             hari_doctor: true,
//             fullName: doctor.fullName, //true
//             gender: doctor.gender, //true
//             dateOfBirth: doctor.dateOfBirth, //true
//             contactNumber: doctor.contactNumber, //true
//             alternateNumber: doctor.alternateNumber,
//             email: doctor.email, //true
//             nationality: doctor.nationality, //true
//             streetAddress: doctor.streetAddress, //true
//             city: doctor.city, //true
//             state: doctor.state, //true
//             postalCode: doctor.postalCode, //true
//             country: doctor.country, //true
//             qualifications: doctor.qualifications, //true
//             specialization: doctor.specialization, //true
//             yearsOfExperience: doctor.yearsOfExperience, //true
//             medicalRegistrationNumber: doctor.medicalRegistrationNumber, //true
//             medicalLicense: doctor.medicalLicense, //true
//             currentHospitalClinicName: doctor.currentHospitalClinicName, //true
//             preferredConsultationMode: doctor.preferredConsultationMode, //true
//             consultationDay: doctor.consultationDay, //true
//             consultationTime: doctor.consultationTime, //true
//             consultationFee: doctor.consultationFee, //true
//             photoIdProof: doctor.photoIdProof,
//             profilePhoto: doctor.profilePhoto,
//             bankName: doctor.bankName,
//             accountHolderName: doctor.accountHolderName,
//             accountNumber: doctor.accountNumber,
//             ifscCode: doctor.ifscCode,
//             branchAddress: doctor.branchAddress,
//             informationAccuracy: doctor.informationAccuracy,
//             agreeToTerms: doctor.agreeToTerms,
//             consentToUseProfile: doctor.consentToUseProfile,
//             signature: doctor.signature,
//             // permissions: doctor.permissions,
//             // enabled: doctor.enabled,
//             appointment: doctor.appointment,
//             current_OPD_Number: doctor.current_OPD_Number,
//         });

//         await newDoctor.save();

//         // OTP Generation (during doctor registration)
//         let verification = await Verifications.addVerification(doctor.contactNumber, "phone", "doctor_registration");
        
//         // Send OTP to the phone via Twilio or another service
//         sendOtp(verification.contact, verification.one_time_password, verification.signature);

//         ret.status = "success";
//         ret.message = "Doctor registered successfully and OTP sent to the phone number.";
//         ret.data = newDoctor._id;  // Returning the doctor's ID
//         res.status(200).json(ret);
//     } catch (err) {
//         console.log(err);
//         ret.message = "Error: " + err.message;
//         res.status(400).json(ret);
//     }
// });




router.post("/doctor_register_otp", async (req, res, next) => {
    // const ownerId = req.user._id;  // assuming the owner ID is available through authentication
    const doctor = req.body;

    const ret = { message: "Sorry, you are not allowed to perform this task, permission denied.", status: "failed" };

    if (!doctor.contactNumber) {
        ret.message = "Phone number is required";
        return res.status(400).json(ret);
    }

    try {
        // Check if a doctor with the same phone number already exists
        const existingDoctor = await Doctors.findOne({ contactNumber: doctor.contactNumber });

        if (existingDoctor) {
            // If the doctor is already registered, send OTP for login
            const verification = await Verifications.addVerification(doctor.contactNumber, "phone", "doctor_login");

            // Send OTP to the phone
            sendOtp(verification.contact, verification.one_time_password, verification.signature);

            ret.status = "success";
            ret.message = "Doctor already registered. OTP sent for login.";
        // ret.data = { doctorId: existingDoctor._id, verificationId: verification._id };  // Returning the doctor's ID and verification ID
        ret.data = verification._id;  // Returning the doctor's ID and verification ID

            // ret.data = existingDoctor._id;  // Returning the existing doctor's ID
            return res.status(200).json(ret);
        }

        // If the doctor is not already registered, proceed with registration
        let user = await Users.findOne({ phone: doctor.contactNumber });
        if (!user) {
            user = new Users({ phone: doctor.contactNumber });
            await user.save();
        }

        doctor.user = user._id;
        // doctor.staff = ownerId;  // Assigning the owner (staff) to the doctor

        const newDoctor = new Doctors({
            user: doctor.user,
            // staff: doctor.staff,
            hari_doctor: true,
            fullName: doctor.fullName,
            gender: doctor.gender,
            dateOfBirth: doctor.dateOfBirth,
            contactNumber: doctor.contactNumber,
            alternateNumber: doctor.alternateNumber,
            email: doctor.email,
            nationality: doctor.nationality,
            streetAddress: doctor.streetAddress,
            city: doctor.city,
            state: doctor.state,
            postalCode: doctor.postalCode,
            country: doctor.country,
            qualifications: doctor.qualifications,
            specialization: doctor.specialization,
            yearsOfExperience: doctor.yearsOfExperience,
            medicalRegistrationNumber: doctor.medicalRegistrationNumber,
            medicalLicense: doctor.medicalLicense,
            currentHospitalClinicName: doctor.currentHospitalClinicName,
            preferredConsultationMode: doctor.preferredConsultationMode,
            consultationDay: doctor.consultationDay,
            consultationTime: doctor.consultationTime,
            consultationFee: doctor.consultationFee,
            photoIdProof: doctor.photoIdProof,
            profilePhoto: doctor.profilePhoto,
            bankName: doctor.bankName,
            accountHolderName: doctor.accountHolderName,
            accountNumber: doctor.accountNumber,
            ifscCode: doctor.ifscCode,
            branchAddress: doctor.branchAddress,
            informationAccuracy: doctor.informationAccuracy,
            agreeToTerms: doctor.agreeToTerms,
            consentToUseProfile: doctor.consentToUseProfile,
            signature: doctor.signature,
            appointment: doctor.appointment,
            current_OPD_Number: doctor.current_OPD_Number,
        });

        await newDoctor.save();

        // OTP Generation (during doctor registration)
        const verification = await Verifications.addVerification(doctor.contactNumber, "phone", "doctor_registration");

        // Send OTP to the phone via Twilio or another service
        sendOtp(verification.contact, verification.one_time_password, verification.signature);

        ret.status = "success";
        ret.message = "Doctor registered successfully and OTP sent to the phone number.";
        // ret.data = { doctorId: newDoctor._id, verificationId: verification._id };  // Returning the doctor's ID and verification ID
        ret.data = verification._id;  // Returning the doctor's ID and verification ID
        
        return res.status(200).json(ret);
    } catch (err) {
        console.log(err);
        ret.message = "Error: " + err.message;
        return res.status(500).json(ret);
    }
});

router.post("/verify_otp", async (req, res, next) => {
    var ret= {status:"failed",message:""};

    var verification_id = req.body.verification_id;
    let otp = req.body.otp;
    let role = req.body.role;

    try{
        let v = Verifications.verifyOTP(verification_id,otp);
        if(v)
        {
            // if(await Users.exists({phone:v.contact}))
            // {
            //     let user = await Users.findOne({phone:v.contact});
            //     if(role == "host")
            //     {

            //     }
            // }
            // let user = Users({phone:v.contact});
            // sendOTP(contact,v.one_time_password,destination_type);
            ret.status = "success";
            
            ret.message = "otp verified";
        }
    }
    catch(err)
    {
        ret.message = err.message;
        console.log(err);

    }
    res.status(200).json(ret);
    
});

module.exports = router;
