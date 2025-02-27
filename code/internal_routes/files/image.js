// const multer = require("multer");
// const path = require('path');
// const express = require("express");

// const Files = require("../../databases/system/files");

// const multerS3 = require("multer-s3");
// const awsSdk = require("aws-sdk");

// require("dotenv").config();

// awsSdk.config.update({
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   region:process.env.AWS_S3_REGION
// });


// const s3 = new awsSdk.S3();

// var s3Upload = multer({
//   storage: multerS3({
//       s3: s3,
//       acl: 'public-read',
//       contentType:multerS3.AUTO_CONTENT_TYPE,
//       bucket: process.env.AWS_S3_BUCKET,
//       key: function (req, file, cb) {
//           console.log(file);
//           cb(null, Date.now()+"_"+file.originalname); //use Date.now() for unique file keys
//       }
//   })
// });

// const router = express.Router();


// router.post('/image_upload', s3Upload.single('image'), async function (req, res, next) {
//   console.log(req.file);
//   let owner = req.user._id;
//   let url = req.file.location;
//   let ret = {status:"failed",message:"done"};
//   try{
//     let f = new Files({url:url,owner:owner,name:req.file.originalname,key:req.file.key});
//     await f.save();
//     ret.status="success";
//   }
//   catch(err){
//     ret.message = err.message;
//   }
//   res.status(200).json(ret);
// });

// router.get('/all', async function (req, res, next) {
//   let ret = {status:"failed",message:"done"};
//   try{
//     let files = await Files.find({}).sort({createdAt:-1});
//     // await f.save();
//     ret.status="success";
//     ret.data = files;
//   }
//   catch(err){
//     ret.message = err.message;
//   }
//   res.status(200).json(ret);
// });

// router.get('/single/:file_id', async function (req, res, next) {
//   let fileId = req.params.file_id;
//   let ret = {status:"failed",message:"done"};
//   try{
//     let file = await Files.findById(fileId).lean();
//     ret.status="success";
//     ret.data = file;
//   }
//   catch(err){
//     ret.message = err.message;
//   }
//   res.status(200).json(ret);
// });

// router.get('/remove/:file_id', async function (req, res, next) {
//   let fileId = req.params.file_id;
//   let ret = {status:"failed",message:"done"};
//   try{
//     let file = await Files.findById(fileId).lean();
//     let key = file.key;
//     console.log(key);
//     if(key){
//       s3.deleteObject({
//         Bucket:process.env.AWS_S3_BUCKET,
//         Key:key
//       });
//     }
//     await Files.deleteOne({_id:fileId});
//     ret.status="success";
//   }
//   catch(err){
//     ret.message = err.message;
//   }
//   res.status(200).json(ret);
// });


// // const multerStorageFile = multer.diskStorage({
// //     destination: (req, file, cb) => {
// //       // console.log(req.originalUrl);
// //       var destination = "../../../content/images/";
// //       req.destination=path.join(__dirname, destination);
// //       // console.log(req);
// //       cb(null, req.destination);
        
// //     },
// //     filename: (req, file, cb) => {
// //       const ext = file.mimetype.split('/')[1];

      
// //         var name = `${Date.now()}.${ext}`;
// //       //   var name = "sd.png";
// //         req.name=name;
// //         console.log(req.name);
// //         cb(null, name);
// //     }
// //   });

// //   const multerFilterFile = (req, file, cb) => {
// //       // console.log("file mimetype:" + file.mimetype);
// //     cb(null, true);
// //   };



// // var uploadFiles = multer({
// //   storage: multerStorageFile,
// //   fileFilter: multerFilterFile,
// // });

// //  // route : {root}/shopping/

// // router.post("/image_upload",uploadFiles.single('image'), async (req, res, next) => {
// //     console.log(1);
// //     var url = "/content/images/" + req.name;
// //     try{
     
// //       console.log(url);
// //       res.status(200).json({status:"success",data:url});
// //     }
// //     catch(e)
// //     {
// //       console.log(e.message);
// //       res.status(200).json({status:"failed",message:"saving file in the db failed"});

// //     }
// // });


// module.exports = router;

 
// const multer = require("multer");
// const path = require('path');
// const express = require("express");

// const Files = require("../../databases/system/files");

// const multerS3 = require("multer-s3");

// // const awsSdk = require("aws-sdk");

// require("dotenv").config();

// // awsSdk.config.update({
// //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// //   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
// //   region:process.env.AWS_S3_REGION
// // });


// // const s3 = new awsSdk.S3();

// // var s3Upload = multer({
// //   storage: multerS3({
// //       s3: s3,
// //       acl: 'public-read',
// //       contentType:multerS3.AUTO_CONTENT_TYPE,
// //       bucket: process.env.AWS_S3_BUCKET,
// //       key: function (req, file, cb) {
// //           console.log(file);
// //           cb(null, Date.now()+"_"+file.originalname); //use Date.now() for unique file keys
// //       }
// //   })
// // });

// const router = express.Router();


// // router.post('/image_upload', s3Upload.single('image'), async function (req, res, next) {
// //   console.log(req.file);
// //   let owner = req.user._id;
// //   let url = req.file.location;
// //   let ret = {status:"failed",message:"done"};
// //   try{
// //     let f = new Files({url:url,owner:owner,name:req.file.originalname,key:req.file.key});
// //     await f.save();
// //     ret.status="success";
// //   }
// //   catch(err){
// //     ret.message = err.message;
// //   }
// //   res.status(200).json(ret);
// // });

// // router.get('/all', async function (req, res, next) {
// //   let ret = {status:"failed",message:"done"};
// //   try{
// //     let files = await Files.find({}).sort({createdAt:-1});
// //     // await f.save();
// //     ret.status="success";
// //     ret.data = files;
// //   }
// //   catch(err){
// //     ret.message = err.message;
// //   }
// //   res.status(200).json(ret);
// // });

// // router.get('/single/:file_id', async function (req, res, next) {
// //   let fileId = req.params.file_id;
// //   let ret = {status:"failed",message:"done"};
// //   try{
// //     let file = await Files.findById(fileId).lean();
// //     ret.status="success";
// //     ret.data = file;
// //   }
// //   catch(err){
// //     ret.message = err.message;
// //   }
// //   res.status(200).json(ret);
// // });

// // router.get('/remove/:file_id', async function (req, res, next) {
// //   let fileId = req.params.file_id;
// //   let ret = {status:"failed",message:"done"};
// //   try{
// //     let file = await Files.findById(fileId).lean();
// //     let key = file.key;
// //     console.log(key);
// //     if(key){
// //       s3.deleteObject({
// //         Bucket:process.env.AWS_S3_BUCKET,
// //         Key:key
// //       });
// //     }
// //     await Files.deleteOne({_id:fileId});
// //     ret.status="success";
// //   }
// //   catch(err){
// //     ret.message = err.message;
// //   }
// //   res.status(200).json(ret);
// // });


// const multerStorageFile = multer.diskStorage({
//     destination: (req, file, cb) => {
//       // console.log(req.originalUrl);
//       var destination = "../../../content/images/";
//       req.destination=path.join(__dirname, destination);
//       // console.log(req);
//       cb(null, req.destination);
        
//     },
//     filename: (req, file, cb) => {
//       const ext = file.mimetype.split('/')[1];

      
//         var name = `${Date.now()}.${ext}`;
//       //   var name = "sd.png";
//         req.name=name;
//         console.log(req.name);
//         cb(null, name);
//     }
//   });

//   const multerFilterFile = (req, file, cb) => {
//       // console.log("file mimetype:" + file.mimetype);
//     cb(null, true);
//   };



// var uploadFiles = multer({
//   storage: multerStorageFile,
//   fileFilter: multerFilterFile,
// });



// router.post("/image_upload",uploadFiles.single('image'), async (req, res, next) => {
//     console.log(1);
//     var url = "/content/images/" + req.name;
//     try{
     
//       console.log(url);
//       res.status(200).json({status:"success",data:url});
//     }
//     catch(e)
//     {
//       console.log(e.message);
//       res.status(200).json({status:"failed",message:"saving file in the db failed"});

//     }
// });

// // Route to get all images
// router.get("/images", async (req, res, next) => {
//     const directoryPath = path.join(__dirname, 'content/images');
  
//     try {
//       fs.readdir(directoryPath, (err, files) => {
//         if (err) {
//           return res.status(500).json({ status: "failed", message: "Unable to scan directory" });
//         }
  
//         const imageUrls = files.map(file => `/content/images/${file}`);
//         res.status(200).json({ status: "success", data: imageUrls });
//       });
//     } catch (e) {
//       console.log(e.message);
//       res.status(500).json({ status: "failed", message: "Failed to retrieve images" });
//     }
//   });

// // Route to get a single image
// router.get("/image/:filename", async (req, res, next) => {
//     const filename = req.params.filename;
//     const filePath = path.join(__dirname, 'content/images', filename);
  
//     fs.access(filePath, fs.constants.F_OK, (err) => {
//       if (err) {
//         return res.status(404).json({ status: "failed", message: "Image not found" });
//       }
  
//       res.sendFile(filePath);
//     });
//   });

//   // Route to delete a single image
// router.delete("/image/:filename", async (req, res, next) => {
//     const filename = req.params.filename;
//     const filePath = path.join(__dirname, 'content/images', filename);
  
//     fs.access(filePath, fs.constants.F_OK, (err) => {
//       if (err) {
//         return res.status(404).json({ status: "failed", message: "Image not found" });
//       }
  
//       fs.unlink(filePath, (err) => {
//         if (err) {
//           return res.status(500).json({ status: "failed", message: "Failed to delete image" });
//         }
  
//         res.status(200).json({ status: "success", message: "Image deleted successfully" });
//       });
//     });
//   });

//   // Route to delete all images
// router.delete("/images", async (req, res, next) => {
//     const directoryPath = path.join(__dirname, 'content/images');
  
//     try {
//       fs.readdir(directoryPath, (err, files) => {
//         if (err) {
//           return res.status(500).json({ status: "failed", message: "Unable to scan directory" });
//         }
  
//         if (files.length === 0) {
//           return res.status(200).json({ status: "success", message: "No images to delete" });
//         }
  
//         files.forEach(file => {
//           const filePath = path.join(directoryPath, file);
//           fs.unlink(filePath, (err) => {
//             if (err) {
//               console.error(`Failed to delete image: ${file}`, err);
//             }
//           });
//         });
  
//         res.status(200).json({ status: "success", message: "All images deleted successfully" });
//       });
//     } catch (e) {
//       console.log(e.message);
//       res.status(500).json({ status: "failed", message: "Failed to delete images" });
//     }
//   });
  
// module.exports = router;

 






const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const multerStorageFile = multer.diskStorage({
  destination: (req, file, cb) => {
    var destination = "content/images/";
    req.destination = path.join(__dirname, destination);
    cb(null, req.destination);
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    var name = `${Date.now()}.${ext}`;
    req.name = name;
    cb(null, name);
  }
});

const multerFilterFile = (req, file, cb) => {
  cb(null, true);
};

const uploadFiles = multer({
  storage: multerStorageFile,
  fileFilter: multerFilterFile,
});

router.post("/image_upload", uploadFiles.single('image'), async (req, res, next) => {
  var url = "/content/images/" + req.name;
  try {
    res.status(200).json({ status: "success", data: url });
  } catch (e) {
    res.status(200).json({ status: "failed", message: "saving file in the db failed" });
  }
});

// Route to get all images
router.get("/get_images", async (req, res, next) => {
  const directoryPath = path.join(__dirname, 'content/images');

  try {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        return res.status(500).json({ status: "failed", message: "Unable to scan directory" });
      }

      const imageUrls = files.map(file => `/content/images/${file}`);
      res.status(200).json({ status: "success", data: imageUrls });
    });
  } catch (e) {
    res.status(500).json({ status: "failed", message: "Failed to retrieve images" });
  }
});

// Route to get a single image
router.get("/get_image/:filename", async (req, res, next) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'content/images', filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ status: "failed", message: "Image not found" });
    }

    res.sendFile(filePath);
  });
});

// Route to delete a single image using POST
router.post("/delete_image", async (req, res, next) => {
  const filename = req.body.filename;
  const filePath = path.join(__dirname, 'content/images', filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ status: "failed", message: "Image not found" });
    }

    fs.unlink(filePath, (err) => {
      if (err) {
        return res.status(500).json({ status: "failed", message: "Failed to delete image" });
      }

      res.status(200).json({ status: "success", message: "Image deleted successfully" });
    });
  });
});

// Route to delete all images using POST
router.post("/delete_all_images", async (req, res, next) => {
  const directoryPath = path.join(__dirname, 'content/images');

  try {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        return res.status(500).json({ status: "failed", message: "Unable to scan directory" });
      }

      if (files.length === 0) {
        return res.status(200).json({ status: "success", message: "No images to delete" });
      }

      files.forEach(file => {
        const filePath = path.join(directoryPath, file);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Failed to delete image: ${file}`, err);
          }
        });
      });

      res.status(200).json({ status: "success", message: "All images deleted successfully" });
    });
  } catch (e) {
    res.status(500).json({ status: "failed", message: "Failed to delete images" });
  }
});

module.exports = router;