const express = require("express");
const router = express.Router();
const Users = require("../../databases/system/users");
const Staff = require("../../databases/staff/staff");
const Patients = require("../../databases/hari_center/patients");
const Appointments = require("../../databases/hari_center/appointments");


const Files = require("../../databases/system/files");
const Doctors = require("../../databases/hari_center/doctors");
const DeletionRecords = require('../../databases/hari_center/deletionRecords');



function checkForPermission(user,permission)
{
    console.log("checking status");
    console.log(user);
    console.log(permission);
	return true;
}


router.get("/files",async (req,res)=>{
    let ret={message:"-",status:"failed"};
    let permission = "staff_read";
    if(!checkForPermission(req.user,permission))
    {
    	res.status(200).json(ret); return;
    }
    try{
        let files = await Files.find().lean();
        ret.status= "success";
        ret.message = "done";
        ret.data = files;
    }
    catch(err){
        ret.message = err.message;
    }
    res.status(200).json(ret);
});

router.get("/staff_members", (req, res, next) => {
    var result=[];
    let permission = "staff_read";

    let ret={message:"Sorry you are not allowed to perform this task, permission denied.",status:"failed"};
    if(!checkForPermission(req.user,permission))
    {
    	res.status(200).json(ret); return;
    }
    console.log("yes:"+req.user._id);
    Staff.find({},'_id username email role permissions created_at',function(err,users){
        if (err)
        {
          console.log("some error occured:"+err);
        }
        else{
            ret.status="success";
            
            users = users.map((el)=>{
                let elm= el.toObject();
                // if(elm.role=="admin")
                // {
                //     elm.permissions = ["ALL PERMISSIONS"];
                // }
                return elm;
            });

            ret.data=users;
            ret.message = "done";
            // ret.user = req.user;
            // delete ret.user.password;
            res.status(200).json(ret);
        } 
    });
});

// router.post("/staff_create", async (req, res, next) => {
//     let ownerId=req.user._id;
//     let username=req.body.username;
//     let role=req.body.role;
//     let phone=req.body.phone;
//     let email=req.body.email;
//     let password=req.body.password;
//     let permissions = req.body.permissions;
//     let permission = "staff_create";

//     let ret={message:"Sorry you are not allowed to perform this task, permission denied.",status:"failed"};
//     if(!checkForPermission(req.user,permission))
//     {
//     	res.status(200).json(ret); 
//         return;
//     }
//     // console.log(req.body);
//     if(!phone)
//     {
//         ret.message = "Phone is not provided";
//     	res.status(200).json(ret); return;
//     }

//     let user;
//     if(await Users.exists({phone:phone})){
//         user = await Users.findOne({phone:phone});
//     }
//     else{
        
//         user = new Users({phone:phone});
//         await user.save();
//     }

//     let d=new Staff({user:user._id,username:username,name:username,role:role,email:email,password:password,permissions:permissions});
//     if(req.user.role == "admin")
//     {
//         d.save((err)=>{
//         if (err){
//         	if(err.code=11000)
//         	{
//         		ret.message="email already exists";
//         	}
//         	else
//         	{
//         		ret.message="Some error occured, please check the values sent in the form";
//         	}
            
//             console.log(err);
//         } 
//         else {

//             // console.log("no error occured");
//             ret.message="Successfully created";
//             ret.status="success";
//             ret.id=d._id;
//             // res.redirect("/directories");
//         }
//         res.status(200).json(ret);

//     });
//     }
//     else
//     {
//         res.status(200).json(ret);
//     }
// });

router.post("/staff_create", async (req, res, next) => {
    try {
        let ownerId = req.user._id;
        let username = req.body.username;
        let role = req.body.role;
        let phone = req.body.phone;
        let email = req.body.email;
        let password = req.body.password;
        let permissions = req.body.permissions;
        let permission = "staff_create";

        let ret = { message: "Sorry you are not allowed to perform this task, permission denied.", status: "failed" };
        if (!checkForPermission(req.user, permission)) {
            console.log("Permission denied for user:", req.user._id);
            res.status(200).json(ret);
            return;
        }

        if (!phone) {
            ret.message = "Phone is not provided";
            console.log("Phone is not provided");
            res.status(200).json(ret);
            return;
        }

        let user;
        if (await Users.exists({ phone: phone })) {
            user = await Users.findOne({ phone: phone });
            console.log("User found:", user);
        } else {
            user = new Users({ phone: phone });
            await user.save();
            console.log("New user created:", user);
        }

        let d = new Staff({ user: user._id, username: username, name: username, role: role, email: email, password: password, permissions: permissions });
        if (req.user.role == "admin") {
            d.save((err) => {
                if (err) {
                    if (err.code == 11000) {
                        ret.message = "Email already exists";
                    } else {
                        ret.message = "Some error occurred, please check the values sent in the form";
                    }
                    console.log("Error saving staff:", err);
                } else {
                    ret.message = "Successfully created";
                    ret.status = "success";
                    ret.id = d._id;
                    console.log("Staff successfully created:", d);
                }
                res.status(200).json(ret);
            });
        } else {
            console.log("User role is not admin:", req.user.role);
            res.status(200).json(ret);
        }
    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ message: "Internal server error", status: "failed" });
    }
});

router.post("/staff_delete/:staffId", (req, res, next) => {
    let ownerId=req.user._id;
    // let name=req.body.name;
    let permission = "staff_create";

    let ret={message:"Sorry you are not allowed to perform this task, permission denied.",status:"failed"};
    if(!checkForPermission(req.user,permission))
    {
    	res.status(200).json(ret); return;
    }

    let staffId = req.params.staffId;
    // console.log(req.user.role);

    // console.log(req.user.role);
    Staff.deleteOne({_id:staffId},function(err,user){
        if (err)
        {
          console.log("some error occured:"+err);
          ret.message="some error occured";
        }
        else{
            ret.status="success";
            ret.staff_removed=user;
            ret.message="removed successfully";
            // ret.user = req.user;
            // delete ret.user.password;    
        }
    res.status(200).json(ret);
    });
});

router.get("/staff_get/:staffId", (req, res, next) => {
    var result=[];
    console.log("yes:");
    let permission = "staff_read";

    let ret={message:"Sorry you are not allowed to perform this task, permission denied.",status:"failed"};
    if(!checkForPermission(req.user,permission))
    {
    	res.status(200).json(ret); return;
    }
    let staffId = req.params.staffId;
    // Staff.findOne({_id:staffId},'_id username email role created_at',function(err,user){
    Staff.findById(staffId,'_id username email role permissions',function(err,user){
        if (err)
        {
          console.log("some error occured:"+err);  
        }
        else{
            let elm= user.toObject();
            console.log(elm);
            if(!elm.permissions)
            {
                elm.permissions=[];
            }
            ret.data=elm;

                
                
            ret.status ="success";
            ret.message = "done";
            res.status(200).json(ret);
        } 
    });
});

router.post("/staff_edit/", async (req, res, next) => {
    let ownerId=req.user._id;
    let staff=req.body;

    let permission = "staff_create";

    let ret={message:"Sorry you are not allowed to perform this task, permission denied.",status:"failed"};
    if(!checkForPermission(req.user,permission))
    {
        res.status(200).json(ret);
        return;
    }

    let staffId = staff._id;
    console.log(staff);
    
    try{
        let y=await Staff.updateOne({_id:staffId},{$set:staff});
        console.log(y);
        ret.status="success";
        console.log("staff is");
        
        res.status(200).json(ret);
    }
    catch(err)
    {
        ret.message = err.message;
        res.status(200).json(ret);
    }
       
});


//hari api for patient
//right

// patient create`

router.post("/patient_create", async (req, res, next) => {
    let ownerId = req.user._id;
    let patient = req.body;
    let permission = "academic_desk_create";

    let ret = { message: "Sorry you are not allowed to perform this task, permission denied.", status: "failed" };
    if (!checkForPermission(req.user, permission)) {
        return res.status(200).json(ret);
    }

    if (!patient.contactNumber) {
        ret.message = "phone not present";
        return res.status(200).json(ret);
    }

    try {
        // Check if a patient with the same phone number already exists
        let existingPatient = await Patients.findOne({ contactNumber: patient.contactNumber });
        if (existingPatient) {
            ret.message = "Patient with this phone number already exists.";
            return res.status(200).json(ret);
        }

        // Check if a user with the same phone number already exists
        let t = await Users.findOne({ phone: patient.contactNumber });
        if (!t) {
            t = new Users({ phone: patient.contactNumber});
            await t.save();
        }
        
        patient.user = t._id;
        console.log(patient);
        patient.staff = ownerId;

      
        let f = new Patients({ 
            user: patient.user,  //true
            staff: patient.staff,
            hari_patient: true,
            guardian_phone: patient.guardian_phone,
            phone_office: patient.phone_office,
            phone_residence: patient.phone_residence,
            patient_picture: patient.patient_picture,
            fullName: patient.fullName,   //true
            gender: patient.gender,       //true
            dateOfBirth: patient.dateOfBirth,  //true
            contactNumber: patient.contactNumber, //true
            emergencyContactNumber: patient.emergencyContactNumber,//true
            emergencyContactName: patient.emergencyContactName, 
            emailAddress: patient.emailAddress, //true
            nationality: patient.nationality,   //true
            // address: {
            streetAddress: patient.streetAddress,
            city: patient.city,
            state: patient.state,
            postalCode: patient.postalCode,
            country: patient.country,
            // },
            // medicalInformation:{ 
            //     bloodGroup:patient.medicalInformation.bloodGroup, 
            //     allergies: patient.medicalInformation.allergies,
            //     medicalHistory: patient.medicalInformation.medicalHistory,

            // },
            bloodGroup:patient.bloodGroup, 
            allergies: patient.allergies,
            medicalHistory: patient.medicalHistory,
            chronicConditions: patient.chronicConditions,
            currentMedications: patient.currentMedications,

            preferredConsultationMode: patient.preferredConsultationMode,
            insuranceProvider: patient.insuranceProvider,
            insuranceIdPolicyNumber: patient.insuranceIdPolicyNumber,
            // termsAndConditions: patient.termsAndConditions,
            // signature: patient.signature,
            date: patient.date,
            time: patient.time,
    
            appointment: patient.appointment,
            referralCode: patient.referralCode,
            
        
        });
        await f.save();

        if (patient.appointment) {
            await Appointments.addPatient(patient.appointment, f._id);
        }


        console.log("no error occurred");
        ret.message = "done";
        ret.data = f._id;
        ret.status = "success";
    } catch (err) {
        ret.message = "Error: " + err.message;
        console.log(err.message);
    }

    res.status(200).json(ret);
});




// router.post("/patient_create", async (req, res, next) => {
//     let ownerId = req.user._id;
//     let patient = req.body;
//     let permission = "academic_desk_create";

//     let ret = { message: "Sorry you are not allowed to perform this task, permission denied.", status: "failed" };
//     if (!checkForPermission(req.user, permission)) {
//         return res.status(403).json(ret);
//     }

//     if (!patient.contactNumber) {
//         ret.message = "phone not present";
//         return res.status(400).json(ret);
//     }

//     try {
//         // Check if a patient with the same phone number already exists
//         let existingPatient = await Patients.findOne({ contactNumber: patient.contactNumber });
//         if (existingPatient) {
//             ret.message = "Patient with this phone number already exists.";
//             return res.status(400).json(ret);
//         }

//         // Check if a user with the same phone number already exists
//         let t = await Users.findOne({ phone: patient.contactNumber });
//         if (!t) {
//             t = new Users({ phone: patient.contactNumber });
//             await t.save();
//         }
        
//         patient.user = t._id;
//         console.log(patient);
//         patient.staff = ownerId;

//         // Ensure patient.address and patient.medicalInformation are defined
//         const address = patient.address || {};
//         const medicalInformation = patient.medicalInformation || {};

//         let f = new Patients({ 
//             user: patient.user,
//             staff: patient.staff,
//             guardian_phone: patient.guardian_phone,
//             phone_office: patient.phone_office,
//             phone_residence: patient.phone_residence,
//             patient_picture: patient.patient_picture,
//             fullName: patient.fullName,
//             gender: patient.gender,
//             dateOfBirth: patient.dateOfBirth,
//             contactNumber: patient.contactNumber,
//             emailAddress: patient.emailAddress,
//             nationality: patient.nationality,
//             address: {
//                 streetAddress: address.streetAddress,
//                 city: address.city,
//                 state: address.state,
//                 postalCode: address.postalCode,
//                 country: address.country
//             },
//             medicalInformation: { 
//                 bloodGroup: medicalInformation.bloodGroup,
//                 allergies: medicalInformation.allergies,
//                 medicalHistory: medicalInformation.medicalHistory,
//             },
//             preferredConsultationMode: patient.preferredConsultationMode,
//             healthInsuranceInformation: patient.healthInsuranceInformation,
//             // termsAndConditions: patient.termsAndConditions,
//             // signature: patient.signature,
//             dateTime: patient.dateTime,
//             appointments: patient.appointments,
//             hari_patient: true,
//         });
//         await f.save();

//         if (patient.appointment) {
//             await Appointments.addPatient(patient.appointment, f._id);
//         }

//         console.log("no error occurred");
//         ret.message = "done";
//         ret.data = f._id;
//         ret.status = "success";
//     } catch (err) {
//         ret.message = "Error: " + err.message;
//         console.error(err.stack);
//         return res.status(500).json(ret);
//     }

//     res.status(200).json(ret);
// });


//for edit single patient


router.post("/patient_edit/:patient_id", async (req, res, next) => {
    let ownerId=req.user._id;
    let patient=req.body;
    let patientId = req.params.patient_id;
    let permission = "academic_desk_create";

    let ret={message:"Sorry you are not allowed to perform this task, permission denied.",status:"failed"};
    if(!checkForPermission(req.user,permission))
    {
        res.status(200).json(ret);
    }

    let keys = Object.keys(patient);
    keys.forEach(key=>{
        if(patient[key]=="-")
        {
            delete patient[key];
        }
    });
    delete patient._id;
    try{
        if(patient.contactNumber){
            let u = await Users.findById(patient.user);
            u.phone = patient.contactNumber;
            await u.save();
        }
        patient.staff=ownerId;
        await Patients.updateOne({_id:patientId},{$set:patient},{ runValidators: true });
        ret.status="success";
        ret.message = "done";
    }
    catch(err){
        ret.message= err.message;
    }
    res.status(200).json(ret);
    
});


// router.post("/patient_edit/:patient_id", async (req, res, next) => {
//   let ret = {
//     message:
//       "Sorry you are not allowed to perform this task, permission denied.",
//     status: "failed",
//   };
//   let ownerId = req.user._id;
//   let patient = req.body;
//   let permission = "academic_desk_create";
//     let patientId = req.params.patient_id;

// //   let ret = { message: "Sorry you are not allowed to perform this task, permission denied.", status: "failed" };
//   if (!checkForPermission(req.user, permission)) {
//       return res.status(200).json(ret);
//   }

//   try {
//     let updateFields = {
//       guardian_phone: patient.guardian_phone,
//       phone_office: patient.phone_office,
//       phone_residence: patient.phone_residence,
//       patient_picture: patient.patient_picture,
//       fullName: patient.fullName, //true
//       gender: patient.gender, //true
//       dateOfBirth: patient.dateOfBirth, //true
//       // contactNumber: patient.contactNumber, //true (never be changed contactNumber otherwise user is corrupted)
//       emergencyContactNumber: patient.emergencyContactNumber, //true
//       emergencyContactName: patient.emergencyContactName, 

//       emailAddress: patient.emailAddress, //true
//       nationality: patient.nationality, //true
//       // address: {
//       streetAddress: patient.streetAddress,
//       city: patient.city,
//       state: patient.state,
//       postalCode: patient.postalCode,
//       country: patient.country,
//       // },
//       // medicalInformation:{
//       //     bloodGroup:patient.medicalInformation.bloodGroup,
//       //     allergies: patient.medicalInformation.allergies,
//       //     medicalHistory: patient.medicalInformation.medicalHistory,

//       // },
//       bloodGroup: patient.bloodGroup,
//       allergies: patient.allergies,
//       medicalHistory: patient.medicalHistory,
//       chronicConditions: patient.chronicConditions,
//       currentMedications: patient.currentMedications,

//       preferredConsultationMode: patient.preferredConsultationMode,
//       insuranceProvider: patient.insuranceProvider,
//       insuranceIdPolicyNumber: patient.insuranceIdPolicyNumber,

//       // termsAndConditions: patient.termsAndConditions,
//       // signature: patient.signature,
//       // date: patient.date,
//       // time: patient.time,

//       appointment: patient.appointment,
//       // referralCode: patient.referralCode,
//     };

//     // Update the patient


//     patient.staff = ownerId;

//     const updatedPatient = await Patients.updateOne(
//       { _id: patientId },
//       { $set: updateFields },
//       { runValidators: true }
//     );
//     ret.status = "success";
//     ret.message = "Patient updated successfully";
//     ret.data = updatedPatient;
//   } catch (err) {
//     console.log("some error occured:" + err);
//     ret.message = err.message;
//   }
//   res.status(200).json(ret);
// });




//for delete single patient

// router.post("/patient_delete/:patientId", async (req, res, next) => {
//     let permission = "academic_desk_create";

//     let ret={message:"Sorry you are not allowed to perform this task, permission denied.",status:"failed"};
//     if(!checkForPermission(req.user,permission))
//     {
//         res.status(200).json(ret);
//     }
//     let patientId = req.params.patientId;
//     try{
//         await Patients.deleteOne({_id:patientId});
//         ret.status="success";
//         ret.message = "done";
//     }
//     catch(err){
//         console.log("some error occured:"+err);  
//         ret.message= err.message;
//     }
//     res.status(200).json(ret);
    
// });

//for disable single patient

router.post("/patient_disable/:patientId", async (req, res, next) => {
    let permission = "academic_desk_create";

    let ret={message:"Sorry you are not allowed to perform this task, permission denied.",status:"failed"};
    if(!checkForPermission(req.user,permission))
    {
        res.status(200).json(ret);
    }
    let patientId = req.params.patientId;
    try{
        await Patients.updateOne({_id:patientId},{$set:{enabled:false}});
        ret.status="success";
        ret.message = "done";
    }
    catch(err){
        console.log("some error occured:"+err);  
        ret.message= err.message;
    }
    res.status(200).json(ret);
});

//patient enable

router.post("/patient_enable/:patientId", async (req, res, next) => {
    let permission = "academic_desk_create";

    let ret={message:"Sorry you are not allowed to perform this task, permission denied.",status:"failed"};
    if(!checkForPermission(req.user,permission))
    {
        res.status(200).json(ret);
    }
    let patientId = req.params.patientId;
    try{
        await Patients.updateOne({_id:patientId},{$set:{enabled:true}});
        ret.status="success";
        ret.message = "done";
    }
    catch(err){
        console.log("some error occured:"+err);  
        ret.message= err.message;
    }
    res.status(200).json(ret);
});

//for get patients and search patients 


// router.get("/patients",(req, res, next) => {
//     let ownerId=req.user._id;
//     let permission = "academic_desk_read";
//     let skip=Number(req.query.skip) || 0;
//     let limit = Number(req.query.limit) || 50;

//     let ret={message:"Sorry you are not allowed to perform this task, permission denied.",status:"failed"};
//     if(!checkForPermission(req.user,permission))
//     {
//         res.status(200).json(ret);
//     }

//     //this is base64
//     let filter = req.query;
//     let filterObj = {};
//     if(filter)
//     {
//         filterObj = filter;
//         //console.log(filterObj);
//         if(filterObj.skip)
//             delete filterObj.skip;

//         if(filterObj.limit)
//             delete filterObj.limit;
//         // filterObj = filter
//     }
//     console.log(filterObj);

//     // let name=req.body.name;

//     Patients.find(filterObj).populate(["appointment"]).skip(skip).limit(limit).exec(function(err,patients){
//         if (err)
//         {
//           console.log("some error occured:"+err);  
//           ret.message= "some error occured";
//         }
//         else{
//             ret.data=patients;
//             ret.status ="success";
//             ret.message = 'done';
//             // res.status(200).json(ret);
//         } 
//         res.status(200).json(ret);
//     });

// });

router.get("/patients", async (req, res, next) => {
    let ownerId = req.user._id;
    let permission = "academic_desk_read";
    let skip = Number(req.query.skip) || 0;
    let limit = Number(req.query.limit) || 50;

    let ret = { message: "Sorry you are not allowed to perform this task, permission denied.", status: "failed" };
    if (!checkForPermission(req.user, permission)) {
        return res.status(403).json(ret);
    }

    //this is base64
    let filter = req.query;
    let filterObj = {};
    if (filter) {
        filterObj = filter;
        if (filterObj.skip) delete filterObj.skip;
        if (filterObj.limit) delete filterObj.limit;
    }
    console.log(filterObj);

    try {
        // Find and sort patients in descending order
        let patients = await Patients.find(filterObj)
            .populate(["appointment"])
            .sort({ created_at: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        // Calculate serial numbers
        let totalPatients = await Patients.countDocuments(filterObj);
        patients = patients.map((patient, index) => {
            patient.serialNumber = totalPatients - (skip + index);
            patient.dateOfBirth = formatDateOfBirth(patient.dateOfBirth);
            return patient;
        });

        ret.data = patients;
        ret.status = "success";
        ret.message = 'done';
    } catch (err) {
        console.error("Some error occurred:", err);
        ret.message = "Some error occurred";
        return res.status(500).json(ret);
    }

    res.status(200).json(ret);
});

// Helper function to format dateOfBirth to dd-mm-yyyy
function formatDateOfBirth(date) {
    const d = new Date(date);
    const day = ("0" + d.getDate()).slice(-2);
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
}


//for gets single patient 

router.get("/patient/:patientId", async (req, res, next) => {
    let patientId = req.params.patientId;
    let permission = "academic_desk_read";
    let ret={message:"Sorry you are not allowed to perform this task, permission denied.",status:"failed"};
    
    if(!checkForPermission(req.user,permission))
    {
        res.status(200).json(ret);
    }

    try{
        let patient = await Patients.findById(patientId).populate(["staff","user","appointment"]).lean();
        ret.data=patient;
        ret.message = "done";
        ret.status ="success";
    }
    catch(err)
    {
      console.log("some error occured:"+err); 
      ret.message= "some error occured"; 
    }
    res.status(200).json(ret);
});

router.post("/patient_delete/:patientId", async (req, res, next) => {
    let permission = "academic_desk_create";

    let ret = { message: "Sorry you are not allowed to perform this task, permission denied.", status: "failed" };
    if (!checkForPermission(req.user, permission)) {
        return res.status(200).json(ret);
    }

    let patientId = req.params.patientId;
    let ownerId = req.user._id;

    try {
        await Patients.deleteOne({ _id: patientId });

        // Save the deletion record
        const deletionRecord = new DeletionRecords({
            entityId: patientId,
            entityType: 'Patient',
            deletedBy: ownerId
        });
        await deletionRecord.save();

        ret.status = "success";
        ret.message = "done";
        ret.data = deletionRecord;
    } catch (err) {
        console.log("some error occurred:" + err);
        ret.message = err.message;
    }
    res.status(200).json(ret);
});

// New route to count the number of documents in the Patients collection
router.get("/patient_count", async (req, res) => {
    let ret = { message: "Sorry you are not allowed to perform this task, permission denied.", status: "failed" };
    try {
      const count = await Patients.countDocuments();
      ret.message = "Count retrieved successfully";
      ret.status = "success";
      ret.data = count;
      return res.status(200).json(ret);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  });

  // amit doctor admin panel api


router.post("/doctor_create", async (req, res, next) => {
    let ownerId = req.user._id;
    let doctor = req.body;
    let permission = "academic_desk_create";

    let ret = { message: "Sorry you are not allowed to perform this task, permission denied.", status: "failed" };
    if (!checkForPermission(req.user, permission)) {
        return res.status(200).json(ret);
    }

    if (!doctor.contactNumber) {
        ret.message = "phone not present";
        return res.status(200).json(ret);
    }

    try {
        // Check if a doctor with the same phone number already exists
        let existingDoctor = await Doctors.findOne({ contactNumber: doctor.contactNumber });
        if (existingDoctor) {
            ret.message = "Doctor with this phone number already exists.";
            return res.status(200).json(ret);
        }

        // Check if a user with the same phone number already exists
        let t = await Users.findOne({ phone: doctor.contactNumber });
        if (!t) {
            t = new Users({ phone: doctor.contactNumber});
            await t.save();
        }
        
        doctor.user = t._id;
        console.log(doctor);
        doctor.staff = ownerId;



        const f = new Doctors({
            user: doctor.user,
            staff: doctor.staff,
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

        await f.save();

        // if (patient.appointment) {
        //     await Appointments.addPatient(patient.appointment, f._id);
        // }


        console.log("no error occurred");
        ret.message = "done";
        ret.data = f._id;
        ret.status = "success";
    } catch (err) {
        ret.message = "Error: " + err.message;
        console.log(err.message);
    }

    res.status(200).json(ret);
});

router.post("/doctor_edit/:doctor_id", async (req, res, next) => {
    let ownerId=req.user._id;
    let doctor=req.body;
    let doctorId = req.params.doctor_id;
    let permission = "academic_desk_create";

    let ret={message:"Sorry you are not allowed to perform this task, permission denied.",status:"failed"};
    if(!checkForPermission(req.user,permission))
    {
        res.status(200).json(ret);
    }

    let keys = Object.keys(doctor);
    keys.forEach(key=>{
        if(doctor[key]=="-")
        {
            delete doctor[key];
        }
    });
    delete doctor._id;
    try{
        if(doctor.contactNumber){
            let u = await Users.findById(doctor.user);
            u.phone = doctor.contactNumber;
            await u.save();
        }
        doctor.staff=ownerId;
        const updateDoctor = await Doctors.updateOne({_id:doctorId},{$set:doctor},{ runValidators: true });
        ret.status="success";
        ret.message = "done";
        ret.data=updateDoctor;
    }
    catch(err){
        ret.message= err.message;
    }
    res.status(200).json(ret);
    
});

//doctor disable

router.post("/doctor_disable/:doctorId", async (req, res, next) => {
    let permission = "academic_desk_create";
    let ownerId=req.user._id;
    let doctor=req.body;

    let ret={message:"Sorry you are not allowed to perform this task, permission denied.",status:"failed"};
    if(!checkForPermission(req.user,permission))
    {
        res.status(200).json(ret);
    }
    let doctorId = req.params.doctorId;
    doctor.staff=ownerId;
    try{
        const updateDoctorStatus = await Doctors.updateOne({_id:doctorId},{$set:{enabled:false}});

        ret.status="success";
        ret.message = "done";
        ret.data=updateDoctorStatus;
    }
    catch(err){
        console.log("some error occured:"+err);  
        ret.message= err.message;
    }
    res.status(200).json(ret);
});

//doctor enable

router.post("/doctor_enable/:doctorId", async (req, res, next) => {
    let permission = "academic_desk_create";
    let ownerId=req.user._id;
    let doctor=req.body;

    let ret={message:"Sorry you are not allowed to perform this task, permission denied.",status:"failed"};
    if(!checkForPermission(req.user,permission))
    {
        res.status(200).json(ret);
    }
    let doctorId = req.params.doctorId;
    doctor.staff=ownerId;
    try{
        const updateDoctorStatus = await Doctors.updateOne({_id:doctorId},{$set:{enabled:true}});
        ret.status="success";
        ret.message = "done";
        ret.data=updateDoctorStatus;
    }
    catch(err){
        console.log("some error occured:"+err);  
        ret.message= err.message;
    }
    res.status(200).json(ret);
});

  router.get("/doctors", async (req, res, next) => {
    let ownerId = req.user._id;
    let permission = "academic_desk_read";
    let skip = Number(req.query.skip) || 0;
    let limit = Number(req.query.limit) || 50;

    let ret = { message: "Sorry you are not allowed to perform this task, permission denied.", status: "failed" };
    if (!checkForPermission(req.user, permission)) {
        return res.status(403).json(ret);
    }

    //this is base64
    let filter = req.query;
    let filterObj = {};
    if (filter) {
        filterObj = filter;
        if (filterObj.skip) delete filterObj.skip;
        if (filterObj.limit) delete filterObj.limit;
    }
    console.log(filterObj);

    try {
        // Find and sort patients in descending order
        let doctors = await Doctors.find(filterObj)
            .populate(["appointment"])
            .sort({ created_at: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        // Calculate serial numbers
        let totalDoctors = await Doctors.countDocuments(filterObj);
        doctors = doctors.map((doctor, index) => {
            doctor.serialNumber = totalDoctors - (skip + index);
            doctor.dateOfBirth = formatDateOfBirth(doctor.dateOfBirth);
            return doctor;
        });

        ret.data = doctors;
        ret.status = "success";
        ret.message = 'done';
    } catch (err) {
        console.error("Some error occurred:", err);
        ret.message = "Some error occurred";
        return res.status(500).json(ret);
    }

    res.status(200).json(ret);
});

router.get("/doctor/:doctorId", async (req, res, next) => {
    let doctorId = req.params.doctorId;
    let permission = "academic_desk_read";
    let ret={message:"Sorry you are not allowed to perform this task, permission denied.",status:"failed"};
    
    if(!checkForPermission(req.user,permission))
    {
        res.status(200).json(ret);
    }

    try{
        let doctor = await Doctors.findById(doctorId).populate(["staff","user","appointment"]).lean();
        ret.data=doctor;
        ret.message = "done";
        ret.status ="success";
    }
    catch(err)
    {
      console.log("some error occured:"+err); 
      ret.message= "some error occured"; 
    }
    res.status(200).json(ret);
});


router.get("/doctor_count", async (req, res) => {
    let ret = { message: "Sorry you are not allowed to perform this task, permission denied.", status: "failed" };
    try {
      const count = await Doctors.countDocuments();
      ret.message = "Count retrieved successfully";
      ret.status = "success";
      ret.data = count;
      return res.status(200).json(ret);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  });


//for delete single doctor

// router.post("/doctor_delete/:doctorId", async (req, res, next) => {
//     let permission = "academic_desk_create";

//     let ret={message:"Sorry you are not allowed to perform this task, permission denied.",status:"failed"};
//     if(!checkForPermission(req.user,permission))
//     {
//         res.status(200).json(ret);
//     }
//     let doctorId = req.params.doctorId;
//     let doctor=req.body;
//     let ownerId=req.user._id;
//     doctor.staff=ownerId;
//     const whosDataDelete= doctor.staff;
//     try{
//         await Doctors.deleteOne({_id:doctorId});
//         ret.status="success";
//         ret.message = "done";
//         ret.data=whosDataDelete;
//     }
//     catch(err){
//         console.log("some error occured:"+err);  
//         ret.message= err.message;
//     }
//     res.status(200).json(ret);
    
// });






// router.post("/doctor_delete/:doctorId", async (req, res, next) => {
//     let permission = "academic_desk_create";

//     let ret = { message: "Sorry you are not allowed to perform this task, permission denied.", status: "failed" };
//     if (!checkForPermission(req.user, permission)) {
//         return res.status(200).json(ret);
//     }

//     let doctorId = req.params.doctorId;
//     let ownerId = req.user._id;

//     try {
//         await Doctors.deleteOne({ _id: doctorId });

//         // Save the deletion record
//         const deletionRecord = new DeletionRecords({
//             doctorId: doctorId,
//             deletedBy: ownerId
//         });
//         await deletionRecord.save();

//         ret.status = "success";
//         ret.message = "done";
//         ret.data = deletionRecord;
//     } catch (err) {
//         console.log("some error occurred:" + err);
//         ret.message = err.message;
//     }
//     res.status(200).json(ret);
// });







router.post("/doctor_delete/:doctorId", async (req, res, next) => {
    let permission = "academic_desk_create";

    let ret = { message: "Sorry you are not allowed to perform this task, permission denied.", status: "failed" };
    if (!checkForPermission(req.user, permission)) {
        return res.status(200).json(ret);
    }

    let doctorId = req.params.doctorId;
    let ownerId = req.user._id;

    try {
        await Doctors.deleteOne({ _id: doctorId });

        // Save the deletion record
        const deletionRecord = new DeletionRecords({
            entityId: doctorId,
            entityType: 'Doctor',
            deletedBy: ownerId
        });
        await deletionRecord.save();

        ret.status = "success";
        ret.message = "done";
        ret.data = deletionRecord;
    } catch (err) {
        console.log("some error occurred:" + err);
        ret.message = err.message;
    }
    res.status(200).json(ret);
});








//appointment create api

router.post("/create_appointment", async (req, res, next) => {

    const appointmentData = req.body;
    const ownerId = req.user._id;  // Assume staff ID comes from authentication middleware
    let permission = "academic_desk_create";
    try {

    let ret = { message: "Sorry you are not allowed to perform this task, permission denied.", status: "failed" };
    if (!checkForPermission(req.user, permission)) {
        return res.status(200).json(ret);
    }
 
    // Validate that required appointment fields are provided
    if (!appointmentData.patients ||!appointmentData.doctors || !appointmentData.appointment_date) {
        ret.message = "Required appointment fields missing (patientId or doctorId or appointment date).";
        return res.status(400).json(ret);  // Return 400 Bad Request
      }
  
      // Check if the doctor exists
      const doctor = await Doctors.findById(appointmentData.doctors);
      if (!doctor) {
        ret.message = "Doctor not found.";
        return res.status(404).json(ret);  // Return 404 Not Found
      }
  
      // Check if the patient exists
      const patient = await Patients.findById(appointmentData.patients);
      if (!patient) {
        ret.message = "Patient not found.";
        return res.status(404).json(ret);  // Return 404 Not Found
      }
  
      appointmentData.staff = ownerId;
  
      // Create a new appointment
      const newAppointment = new Appointments({
        staff: appointmentData.staff,
        patients: appointmentData.patients,  
        doctors: appointmentData.doctors,  
        appointment_request_date: appointmentData.appointment_request_date,
        appointment_time: appointmentData.appointment_time,
        appointment_payment: appointmentData.appointment_payment,
        payment_method: appointmentData.payment_method,
        payment_transaction_id: appointmentData.payment_transaction_id,
        appointment_type: appointmentData.appointment_type,
        reason_for_visit: appointmentData.reason_for_visit,
        notes: appointmentData.notes,
      });
  
      // Save the appointment to the database
      const savedAppointment = await newAppointment.save();
  
      ret.status = "success";
      ret.message = "Appointment created successfully";
      ret.data = savedAppointment._id;  // Optionally, you can include more details in the response if needed
      return res.status(201).json(ret);  // Return 201 Created when appointment is successfully created
  
    } catch (err) {
      console.log("Some error occurred:", err);
      ret.message = err.message || "An error occurred while creating the appointment.";
      return res.status(500).json(ret);  // Return 500 Internal Server Error if an exception occurs
    }
  });


//appointment edit

  router.post("/appointment_edit/:appointment_id", async (req, res, next) => {
    let ownerId=req.user._id;
    let appointment=req.body;
    let appointmentId = req.params.appointment_id;
    let permission = "academic_desk_create";

    let ret={message:"Sorry you are not allowed to perform this task, permission denied.",status:"failed"};
    if(!checkForPermission(req.user,permission))
    {
        res.status(200).json(ret);
    }

    let keys = Object.keys(doctor);
    keys.forEach(key=>{
        if(appointment[key]=="-")
        {
            delete appointment[key];
        }
    });
    delete appointment._id;
    try{
        
        appointment.staff=ownerId;
        const updateAppointment = await Appointments.updateOne({_id:appointmentId},{$set:appointment},{ runValidators: true });
        ret.status="success";
        ret.message = "done";
        ret.data=updateAppointment;
    }
    catch(err){
        ret.message= err.message;
    }
    res.status(200).json(ret);
    
});




router.get("/appointments", async (req, res, next) => {
    let ownerId = req.user._id;
    let permission = "academic_desk_read";
    let skip = Number(req.query.skip) || 0;
    let limit = Number(req.query.limit) || 50;

    let ret = { message: "Sorry you are not allowed to perform this task, permission denied.", status: "failed" };
    if (!checkForPermission(req.user, permission)) {
        return res.status(403).json(ret);
    }

    //this is base64
    let filter = req.query;
    let filterObj = {};
    if (filter) {
        filterObj = filter;
        if (filterObj.skip) delete filterObj.skip;
        if (filterObj.limit) delete filterObj.limit;
    }
    console.log(filterObj);

    try {
        // Find and sort patients in descending order
        let appointments = await Appointments.find(filterObj)
            .populate(["appointment"])
            .sort({ updatedAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        // Calculate serial numbers
        let totalAppointments = await Appointments.countDocuments(filterObj);
        appointments = appointments.map((appointment, index) => {
            appointment.serialNumber = totalAppointments - (skip + index);
            return appointment;
        });

        ret.data = appointments;
        ret.status = "success";
        ret.message = 'done';
    } catch (err) {
        console.error("Some error occurred:", err);
        ret.message = "Some error occurred";
        return res.status(500).json(ret);
    }

    res.status(200).json(ret);
});

router.get("/appointment/:appointmentId", async (req, res, next) => {
    let appointmentId = req.params.appointmentId;
    let permission = "academic_desk_read";
    let ret={message:"Sorry you are not allowed to perform this task, permission denied.",status:"failed"};
    
    if(!checkForPermission(req.user,permission))
    {
        res.status(200).json(ret);
    }

    try{
        let appointment = await Appointments.findById(appointmentId).populate(["patents","doctors",]).lean();
        ret.data=appointment;
        ret.message = "done";
        ret.status ="success";
    }
    catch(err)
    {
      console.log("some error occured:"+err); 
      ret.message= "some error occured"; 
    }
    res.status(200).json(ret);
});


router.get("/appointment_count", async (req, res) => {
    let ret = { message: "Sorry you are not allowed to perform this task, permission denied.", status: "failed" };
    try {
      const count = await Appointments.countDocuments();
      ret.message = "Count retrieved successfully";
      ret.status = "success";
      ret.data = count;
      return res.status(200).json(ret);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  });



  router.post("/appointment_delete/:appointmentId", async (req, res, next) => {
    let permission = "academic_desk_create";

    let ret = { message: "Sorry you are not allowed to perform this task, permission denied.", status: "failed" };
    if (!checkForPermission(req.user, permission)) {
        return res.status(200).json(ret);
    }

    let appointmentId = req.params.appointmentId;
    let ownerId = req.user._id;

    try {
        await Appointments.deleteOne({ _id: appointmentId });

        // Save the deletion record
        const deletionRecord = new DeletionRecords({
            entityId: appointmentId,
            entityType: 'Appointment',
            deletedBy: ownerId
        });
        await deletionRecord.save();

        ret.status = "success";
        ret.message = "done";
        ret.data = deletionRecord;
    } catch (err) {
        console.log("some error occurred:" + err);
        ret.message = err.message;
    }
    res.status(200).json(ret);
});





  router.get("/deletion_records", async (req, res, next) => {
    let ownerId = req.user._id;
    let permission = "academic_desk_read";
    let skip = Number(req.query.skip) || 0;
    let limit = Number(req.query.limit) || 50;

    let ret = { message: "Sorry you are not allowed to perform this task, permission denied.", status: "failed" };
    if (!checkForPermission(req.user, permission)) {
        return res.status(403).json(ret);
    }

    //this is base64
    let filter = req.query;
    let filterObj = {};
    if (filter) {
        filterObj = filter;
        if (filterObj.skip) delete filterObj.skip;
        if (filterObj.limit) delete filterObj.limit;
    }
    console.log(filterObj);

    try {
        // Find and sort patients in descending order
        let d = await DeletionRecords.find(filterObj)
            .populate({ path: 'deletedBy', model: 'staff' })
            .sort({ created_at: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        // // Calculate serial numbers
        // let totalDoctors = await Doctors.countDocuments(filterObj);
        // doctors = doctors.map((doctor, index) => {
        //     doctor.serialNumber = totalDoctors - (skip + index);
        //     return doctor;
        // });

        ret.data = d;
        ret.status = "success";
        ret.message = 'done';
    } catch (err) {
        console.error("Some error occurred:", err);
        ret.message = "Some error occurred";
        return res.status(500).json(ret);
    }

    res.status(200).json(ret);
});
















router.get("/dashboard",async (req, res, next) => {
    let user_id=req.user._id;
    // let resultId = req.params.resultId;
    let permission = "academic_desk_read";

    let ret={message:"Sorry you are not allowed to perform this task, permission denied.",status:"failed"};
    if(!checkForPermission(req.user,permission))
    {

    	res.status(200).json(ret);
    }

    try{
        let finalPackage=new Object();
        console.log("checkpoint 1");
        let patients = await Patients.find({}).limit(5).sort({created_at:-1});
        patients=patients.map(function(element){
            element= element.toObject();
            delete element.password;
            delete element.contactNumber;
            delete element.emergencyContactNumber;
            delete element.last_login;
            delete element.password_hash;
            delete element.postalCode;
            return element;
        });
        finalPackage.patients = patients;
        console.log("checkpoint 2");
        let doctors = await Doctors.find({}).limit(5).sort({created_at:-1});
        doctors=doctors.map(function(element){
            element= element.toObject();
            delete element.password;
            delete element.contactNumber;
            delete element.alternateNumber;
            delete element.last_login;
            delete element.password_hash;
            delete element.postalCode;
            return element;
        });
        finalPackage.doctors = doctors;
        // console.log("checkpoint 3");
        // let tests = await Tests.find({}).populate("streams").limit(5).sort({created_at:-1});
        // finalPackage.tests = tests;

        // console.log("checkpoint 3");

        // let questions = await Questions.find({}).limit(5).sort({created_at:-1});
        // finalPackage.questions = questions;


        console.log("checkpoint 4");
        let profile = await Staff.findOne({"_id":user_id});
        profile=profile.toObject();
        delete profile.password;
        if(profile.role="admin")
        {
            profile.permissions = ["Full Permissions"];
        }
        finalPackage.profile = profile;
        console.log("checkpoint done");
        ret.status = "success";
        ret.message="done";
        ret.data=finalPackage;
        res.status(200).json(ret);
        return;
    }
    
    catch(err){
        console.log(err);
        ret.message=err.message;
        res.status(200).json(ret)
    }

});




router.get("/search/:pattern",async (req, res, next) => {
    let user_id=req.user._id;
    let pattern = req.params.pattern;
    let permission = "academic_desk_read";

    let ret={message:"Sorry you are not allowed to perform this task, permission denied.",status:"failed"};
    if(!checkForPermission(req.user,permission))
    {

        res.status(200).json(ret);
    }


    if(pattern.length==24)
    {
        try{
            
            let finalPackage=new Object();

            let patients = await Patients.find({'_id':pattern});
            patients=patients.map(function(element){
                element= element.toObject();
                delete element.password;
                delete element.contactNumber;
                delete element.last_login;
                delete element.password_hash;
                delete element.pincode;
                return element;
            });
            finalPackage.patients = patients;

            let doctors = await Doctors.find({}).limit(5).sort({created_at:-1});
            doctors=doctors.map(function(element){
                element= element.toObject();
                delete element.password;
                delete element.contactNumber;
                delete element.alternateNumber;
                delete element.last_login;
                delete element.password_hash;
                delete element.postalCode;
                return element;
            });
            finalPackage.doctors = doctors;

            // let tests = await Tests.find({'_id':pattern});
            // finalPackage.tests = tests;

            // let questions = await Questions.find({'_id':pattern});
            // finalPackage.questions = questions;

            let profile = await Staff.findOne({"_id":user_id});
            profile=profile.toObject();
            delete profile.password;
            if(profile.role="admin")
            {
                profile.permissions = ["Full Permissions"];
            }
            finalPackage.profile = profile;

            ret.status = "success";
            ret.message="done";
            ret.data=finalPackage;
            res.status(200).json(ret);
            return;
        }
        
        catch(err){
            console.log(err);
            ret.message=err.message;
            res.status(200).json(ret)
        }
    }
    else
    {
        try{
            pattern = new RegExp('.*'+pattern+'.*','i');
            let finalPackage=new Object();

            let patients = await Patients.find({$or:[{'fullName':pattern},{'emailAddress':pattern},{'city':pattern},{'state':pattern}]}).limit(10).sort({created_at:-1});
            patients=patients.map(function(element){
                element= element.toObject();
                delete element.password;
                delete element.contactNumber;
                delete element.last_login;
                delete element.password_hash;
                delete element.pincode;
                return element;
            });
            finalPackage.patients = patients;
            let doctors = await Doctors.find({}).limit(5).sort({created_at:-1});
            doctors=doctors.map(function(element){
                element= element.toObject();
                delete element.password;
                delete element.contactNumber;
                delete element.alternateNumber;
                delete element.last_login;
                delete element.password_hash;
                delete element.postalCode;
                return element;
            });
            finalPackage.doctors = doctors;
            // let tests = await Tests.find({$or:[{'name':pattern},{'test_type':pattern}]}).limit(10).sort({created_at:-1});
            // finalPackage.tests = tests;

            // let questions = await Questions.find({$or:[{'body':pattern},{'question':pattern},{'passage':pattern},{'question_type':pattern}]}).limit(10).sort({created_at:-1});
            // finalPackage.questions = questions;

            let profile = await Staff.findOne({"_id":user_id});
            profile=profile.toObject();
            delete profile.password;
            if(profile.role="admin")
            {
                profile.permissions = ["Full Permissions"];
            }
            finalPackage.profile = profile;

            ret.status = "success";
            ret.message="done";
            ret.data=finalPackage;
            res.status(200).json(ret);
            return;
        }
        
        catch(err){
            console.log(err);
            ret.message=err.message;
            res.status(200).json(ret)
        }
    }
    // let resultId = req.params.resultId;
});




module.exports = router;





//right
// router.post("/student_create", async (req, res, next) => {
//     let ownerId = req.user._id;
//     let student = req.body;
//     let permission = "academic_desk_create";

//     let ret = { message: "Sorry you are not allowed to perform this task, permission denied.", status: "failed" };
//     if (!checkForPermission(req.user, permission)) {
//         return res.status(200).json(ret);
//     }

//     if (!student.phone) {
//         ret.message = "phone not present";
//         return res.status(200).json(ret);
//     }

//     try {
//         // Check if a student with the same phone number already exists
//         let existingStudent = await Students.findOne({ phone: student.phone });
//         if (existingStudent) {
//             ret.message = "Student with this phone number already exists.";
//             return res.status(200).json(ret);
//         }

//         // Check if a user with the same phone number already exists
//         let t = await Users.findOne({ phone: student.phone });
//         if (!t) {
//             t = new Users({ phone: student.phone });
//             await t.save();
//         }
        
//         student.user = t._id;
//         console.log(student);
//         student.staff = ownerId;
      
//         let f = new Students({ 
//             phone: student.phone,
//             name: student.name,
//             email: student.email,
//             branch: student.branch,
//             stream: student.stream, 
//             user: student.user, 
//             staff: student.staff, 
//             gravity_student: true,
//             date_of_birth: student.date_of_birth,
//             blood_group: student.blood_group,
//             gender: student.gender,
//             category: student.category,
//         });
//         await f.save();

//         if (student.batch) {
//             await Batches.addStudent(student.batch, f._id);
//         }

//         if (student.primary_address) {
//             let pa = new Addresses({ user: t._id, address_type: "primary", address: student.primary_address });
//             await pa.save();
//         }

//         if (student.secondary_address) {
//             let sa = new Addresses({ user: t._id, address_type: "secondary", address: student.secondary_address });
//             await sa.save();
//         }

//         console.log("no error occurred");
//         ret.message = "done";
//         ret.data = f._id;
//         ret.status = "success";
//     } catch (err) {
//         ret.message = "Error: " + err.message;
//         console.log(err.message);
//     }

//     res.status(200).json(ret);
// });
// //right
// router.post("/student_create", async (req, res, next) => {
//     let ownerId = req.user._id;
//     let student = req.body;
//     let permission = "academic_desk_create";

//     let ret = { message: "Sorry you are not allowed to perform this task, permission denied.", status: "failed" };
//     if (!checkForPermission(req.user, permission)) {
//         return res.status(200).json(ret);
//     }

//     if (!student.phone) {
//         ret.message = "phone not present";
//         return res.status(200).json(ret);
//     }

//     try {
//         // Check if a student with the same phone number already exists
//         let existingStudent = await Students.findOne({ phone: student.phone });
//         if (existingStudent) {
//             ret.message = "Student with this phone number already exists.";
//             return res.status(200).json(ret);
//         }

//         // Check if a user with the same phone number already exists
//         let t = await Users.findOne({ phone: student.phone });
//         if (!t) {
//             t = new Users({ phone: student.phone });
//             await t.save();
//         }
        
//         student.user = t._id;
//         console.log(student);
//         student.staff = ownerId;
      
//         let f = new Students({ 
//             phone: student.phone,
//             name: student.name,
//             email: student.email,
//             branch: student.branch,
//             stream: student.stream, 
//             user: student.user, 
//             staff: student.staff, 
//             gravity_student: true,
//             date_of_birth: student.date_of_birth,
//             blood_group: student.blood_group,
//             gender: student.gender,
//             category: student.category,
//         });
//         await f.save();

//         if (student.batch) {
//             await Batches.addStudent(student.batch, f._id);
//         }

//         if (student.primary_address) {
//             let pa = new Addresses({ user: t._id, address_type: "primary", address: student.primary_address });
//             await pa.save();
//         }

//         if (student.secondary_address) {
//             let sa = new Addresses({ user: t._id, address_type: "secondary", address: student.secondary_address });
//             await sa.save();
//         }

//         console.log("no error occurred");
//         ret.message = "done";
//         ret.data = f._id;
//         ret.status = "success";
//     } catch (err) {
//         ret.message = "Error: " + err.message;
//         console.log(err.message);
//     }

//     res.status(200).json(ret);
// });
// //right
