// /*

//    mm   m    m mmmmm mmmmmmm        m    m m    m m    m   mm   mmmmm        
//    ##   ##  ##   #      #           #  m"  #    # ##  ##   ##   #   "#       
//   #  #  # ## #   #      #           #m#    #    # # ## #  #  #  #mmmm"       
//   #mm#  # "" #   #      #           #  #m  #    # # "" #  #mm#  #   "m       
//  #    # #    # mm#mm    #           #   "m "mmmm" #    # #    # #    "       

//    mm   mm   m   mm   mm   m mmmm                                            
//    ##   #"m  #   ##   #"m  # #   "m                                          
//   #  #  # #m #  #  #  # #m # #    #                                          
//   #mm#  #  # #  #mm#  #  # # #    #                                          
//  #    # #   ## #    # #   ## #mmm"                                           


//  */

// var figlet = require('figlet');


// //Thin, Straight Stellar Invita
// figlet('AMIT KUMAR ANAND',font="Stellar", function(err, data) {
//     if (err) {
//         console.log('Something went wrong...');
//         console.dir(err);
//         return;
//     }
//     console.log(data);
//     // console.log("Email: iamn71@neoned71.com");

// });

// figlet('API Server',font="Thin", function(err, data) {
//     if (err) {
//         console.log('Something went wrong...');
//         console.dir(err);
//         return;
//     }
//     console.log(data);
//     console.log("Email: iamn71@neoned71.com");

// });

// const session = require("express-session");
// const fs= require("fs");
// const MongoStore = require("connect-mongo");
// const mongoose = require("mongoose");
// const multer = require("multer");
// var upload = multer();
// var cors = require('cors');



// // var passportSocketio=require("passport.socketio");


// var express = require('express');
// var cookieParser=require("cookie-parser");
// const uuid = require('uuid');
// const url = require('url');
// var app = express();
// const http = require('http');
// const https = require('https');
// var bodyParser = require("body-parser");
// var base64js = require('base64-js');


// const passport = require("./passport/setup_otp");


// require("dotenv").config();

// /*
// //custom routers
// const auth = require("./routes/auth");

// var panel= require('./routes/panel');
// var students= require('./routes/students/students');
// var studentsAuth= require('./routes/students/auth');
// var studentsFile= require('./routes/students/files');
// var files= require('./routes/files');
// */

// const businessRoute = require("./code/public_routes/business/index");
// const panelRoute= require("./code/public_routes/control_panel/index");
// const userRoute = require("./code/public_routes/user/index");
// const webhookRoute = require("./code/public_routes/payments/index");
// // const rzpWebhook = require("./code/public_routes/payments/index");
// const promotionRoute = require("./code/internal_routes/student_center/promotions");
// const { fonts } = require('figlet');
// const Api = require('twilio/lib/rest/Api');
// const Staff = require('./code/databases/staff/staff');

// //mongo configuration
// const MONGO_URI = process.env.MONGO_URI;
// const mongoosePromise=mongoose.connect(MONGO_URI).then(m => m.connection.getClient()).catch(err => console.log(err));

// app.use(cors());
// app.use(express.json({ limit: "200mb" }));
// app.use(express.urlencoded({ extended: false }));




// // app.use(upload.array());
// var port=process.env.SERVER_PORT;
// //session keys and secrets
// var sessionKey=process.env.SESSION_KEY;
// var sessionSecret=process.env.SESSION_SECRET;


// // var port=process.env.SERVER_PORT;

// var sessionStore= MongoStore.create({ clientPromise:mongoosePromise });

// // var sessionStore= new MongoStore({ mongooseConnection: mongoose.connection });

// var sessionMiddleWare=session({
//         key:sessionKey,
//         secret: sessionSecret,
//         resave: false,
//         saveUninitialized: true,
//         store: sessionStore
//     });
// // Express Session
// app.use(sessionMiddleWare);
// // app.use(cookieParser);

// function headerMiddleware(req,res,next)
// {
//     console.log(JSON.stringify(req.headers));
//     next();
// }

// // Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());
// app.use((req,res,next)=>{console.log(req.path);next();});

// app.use("/api/business",businessRoute); 
// app.use("/api/panel",panelRoute);
// app.use("/api/user",headerMiddleware,userRoute);
// app.use("/api/promotions",promotionRoute);

// // app.use("/api/createStaff",async (req,res)=>{
// //     console.log("creating the staff member");
// //     try{
// //         let user = new Users({phone:"8630376691",enabled_as_administrator:true});
// //         await user.save();
// //         let staff = new Staff({
// //             enabled:true,
// //             email: 'amitkumaranandaka123@gmail.com',
// //         password: 'engineer@1991',
// //         phone: '8630376691',
// //         role: 'admin',
// //         username: 'Amit',
// //         user: "63e0e1b3d69d1182b1c4cc34"});
// //         await staff.save();
// //     }
// //     catch(err){
// //         console.log(err.message);
// //     }
// // });

// app.use("/api/webhook",webhookRoute);

// app.get("/",(req,res)=>{
//     let ret = {status:"success",code:71,message:"Hi, start using the api server....hit a fork in the github repo"};
//     res.status(200).json(ret);
// });



// // app.use("/api/*",function(req,res){
// //     let ret = {status:"success",code:71,message:"Welcome to the API server for Clumsy"};
// //     res.status(200).json(ret);
// //     // let ret={message:"API path not found",status:"failed"};
// //     // res.status(404).json(ret);
// // });

// /*app.get("/",(req,res)=>{
//     let ret = {status:"success",code:71,message:"Hi, start using the api server....hit a fork in the github repo"};
//     res.status(200).json(ret);
// })*/


// //static content 
// app.use('/content', express.static(__dirname + '/content/'));

// app.use('/img', express.static(__dirname + '/img/'));


// app.use("/*",function(req,res){
//     console.log(req.path);
//     let ret = {status:"success",code:71,message:"Hi, you have seem to have stumbled upon a missing link with path:"+req.path.toString()};

//     res.status(404).end(JSON.stringify(ret));
//     return;

// })


// // function performLogin(req, res, next)
// // {
// //     //this callback function is called after setup.js file function has returned, its just later in that pipeline, actually, the immediate next...
// //     passport.authenticate("local_strategy_user", function(err, user, info) {
// //         console.log("Entered authenticate");
// //         if (err) {
// //             console.log("err authenticate"+err);
// //             return res.status(400).json({ status:"failed",message:err });
// //         }

// //         if (!user) {
// //             console.log(1);
// //             console.log(info);
// //             return res.status(400).json({ status:"failed",message:info.message });
// //         }

// //         req.logIn(user, function(err) {
// //             if (err) {
// //                 console.log("err login");
// //                 return res.status(400).json({ status:"failed",message : err });
// //             }
// //             console.log("done authenticate");
// //             const { password, updated_at,created_at,email_is_verified, ...other } = user._doc;
// //             return res.status(200).json({ status:"success",message: `logged in ${user.id}`,user_id:user.id,user:{...other,id:other._id}});
// //         });
// //         console.log(2);
// //     })(req, res, next);
// // }

// // function performValidationUser(req, res, next)
// // {
// //     //this callback function is called after setup.js file function has returned, its just later in that pipeline, actually, the immediate next...
// //     passport.authenticate("jwt_user", { session: false },/*callback=>*/function(err, user, info) {
// //         console.log("Entered authenticate");
// //         if (err) {
// //             console.log("err authenticate"+err);
// //             return res.status(400).json({ status:"failed",message:err });
// //         }

// //         if (!user) {
// //             console.log(info);
// //             return res.status(400).json({ status:"failed",message:info.message });
// //         }

// //         req.logIn(user, function(err) {
// //             if (err) {
// //                 console.log("err login");
// //                 return res.status(400).json({ status:"failed",message : err });
// //             }
// //             console.log("done authenticate");
// //             // const { password, updated_at,created_at,email_is_verified, ...other } = user._doc;
// //             return res.status(200).json({ status:"success",message: `logged in ${user.id}`,user_id:user.id,user:user});
// //         });
// //     })(req, res, next);
// // }
// // app.get("/login",checkForLoggedIn,(req, res) => {res.render('pages/login_complete');});



// const server = http.createServer(app);


// //socket io!
// //-----------------------uncomment for socket io but do provide certificates!----------------------
// // const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
// // const socketApp = express();
// // socketApp.use(cors());

// // const socketServer = https.createServer({ 
// //                 key: fs.readFileSync('./secrets/privkey.pem'),
// //                 cert: fs.readFileSync('./secrets/fullchain.pem') 
// //              }, socketApp);

// // const options = { path:'/socket.io',transports: ['websocket'],origin: "*" , destroyUpgrade: false};

// // const io = require('socket.io')(socketServer, options);
// // io.use(wrap(passport.authenticate('jwt_param', { session: false })));
// // io.on('connection', socket => {
// //   console.log("connection established");

// //   let roomId=socket.handshake.query.room_id;


// //   if(roomId && mongoose.Types.ObjectId.isValid(roomId) && rooms.has(roomId))
// //   {
// //     console.log(socket.request.user);
// //     rooms.get(roomId).handleSocket(socket,io);
// //   }
// //   else
// //   {
// //     console.log("room_id not present");

// //     return;
// //   }
// // });

// // // app.use("/socket.io",passport.authenticate('jwt',{session:false}),function(req,res){console.log(req.headers);res.end();console.log(req.user);});
// // //Socketio ends

// // app.use("/api/rooms",passport.authenticate('jwt',{session:false}),ioAttacher, roomRouter);


// // function ioAttacher(req,res,next)
// // {
// //   req.io=io;
// //   next();
// // }


// // socketServer.listen(port+2);
// // server.listen(port);
// // console.log("NEONED71 API Server started at port:"+port);


// // // Listen on all IPv6 addresses (represented by '::') on the specified port
// // server.listen(port, '::', () => {
// //     console.log(`AMIT KUMAR ANAND API Server listening on all IPv6 addresses (::) on port: ${port}`);
// //   });

// // Listen on both IPv4 and IPv6 addresses (default behavior)
// server.listen(port, () => {
//     console.log(`AMIT KUMAR ANAND API Server listening on both IPv4 and IPv6 addresses on port: ${port}`);
// });




























/*

   mm   m    m mmmmm mmmmmmm        m    m m    m m    m   mm   mmmmm        
   ##   ##  ##   #      #           #  m"  #    # ##  ##   ##   #   "#       
  #  #  # ## #   #      #           #m#    #    # # ## #  #  #  #mmmm"       
  #mm#  # "" #   #      #           #  #m  #    # # "" #  #mm#  #   "m       
 #    # #    # mm#mm    #           #   "m "mmmm" #    # #    # #    "       

   mm   mm   m   mm   mm   m mmmm                                            
   ##   #"m  #   ##   #"m  # #   "m                                          
  #  #  # #m #  #  #  # #m # #    #                                          
  #mm#  #  # #  #mm#  #  # # #    #                                          
 #    # #   ## #    # #   ## #mmm"                                           


 */

 var figlet = require('figlet');


 //Thin, Straight Stellar Invita
 figlet('AMIT KUMAR ANAND',font="Thin", function(err, data) {
     if (err) {
         console.log('Something went wrong...');
         console.dir(err);
         return;
     }
     console.log(data);
    
 
 });
 
 figlet('API Server For Hari',font="Thin", function(err, data) {
     if (err) {
         console.log('Something went wrong...');
         console.dir(err);
         return;
     }
     console.log(data);
     console.log("Email: amitkumaranandaka123@gmail.com");
 
 });
 
 const session = require("express-session");
 const fs= require("fs");
 const MongoStore = require("connect-mongo");
 const mongoose = require("mongoose");
 const multer = require("multer");
 var upload = multer();
 var cors = require('cors');
 
 
 
 // var passportSocketio=require("passport.socketio");
 
 
 var express = require('express');
 var cookieParser=require("cookie-parser");
 const uuid = require('uuid');
 const url = require('url');
 var app = express();
 const http = require('http');
 const https = require('https');
 var bodyParser = require("body-parser");
 var base64js = require('base64-js');
 
 
 const passport = require("./passport/setup_otp");
 
 
 require("dotenv").config();
 
 /*
 //custom routers
 const auth = require("./routes/auth");
 
 var panel= require('./routes/panel');
 var students= require('./routes/students/students');
 var studentsAuth= require('./routes/students/auth');
 var studentsFile= require('./routes/students/files');
 var files= require('./routes/files');
 */
 
//  const businessRoute = require("./code/public_routes/business/index");
 const panelRoute= require("./code/public_routes/control_panel/index");
 const userRoute = require("./code/public_routes/user/index");
 const webhookRoute = require("./code/public_routes/payments/index");
 // const rzpWebhook = require("./code/public_routes/payments/index");
//  const promotionRoute = require("./code/internal_routes/student_center/promotions");
 const { fonts } = require('figlet');
 const Api = require('twilio/lib/rest/Api');
 const Staff = require('./code/databases/staff/staff');
 

  // Set the strictQuery option to false or true based on your preference
  mongoose.set('strictQuery', false); // or mongoose.set('strictQuery', true);


 //mongo configuration
 const MONGO_URI = process.env.MONGO_URI;
 const mongoosePromise=mongoose.connect(MONGO_URI).then(m => m.connection.getClient()).catch(err => console.log(err));
 
 app.use(cors());
 app.use(express.json({ limit: "200mb" }));
 app.use(express.urlencoded({ extended: false }));
 
 

 
 // app.use(upload.array());
 var port=process.env.SERVER_PORT;
 //session keys and secrets
 var sessionKey=process.env.SESSION_KEY;
 var sessionSecret=process.env.SESSION_SECRET;
 
 
 // var port=process.env.SERVER_PORT;
 
 var sessionStore= MongoStore.create({ clientPromise:mongoosePromise });
 
 // var sessionStore= new MongoStore({ mongooseConnection: mongoose.connection });
 
 var sessionMiddleWare=session({
         key:sessionKey,
         secret: sessionSecret,
         resave: false,
         saveUninitialized: true,
         store: sessionStore
     });
 // Express Session
 app.use(sessionMiddleWare);
 // app.use(cookieParser);
 
 function headerMiddleware(req,res,next)
 {
     console.log(JSON.stringify(req.headers));
     next();
 }
 
 // Passport middleware
 app.use(passport.initialize());
 app.use(passport.session());
 app.use((req,res,next)=>{console.log(req.path);next();});
 
//  app.use("/api/business",businessRoute); 
 app.use("/api/panel",panelRoute);
 app.use("/api/user",headerMiddleware,userRoute);
//  app.use("/api/promotions",promotionRoute);
 
 // app.use("/api/createStaff",async (req,res)=>{
 //     console.log("creating the staff member");
 //     try{
 //         let user = new Users({phone:"8630376691",enabled_as_administrator:true});
 //         await user.save();
 //         let staff = new Staff({
 //             enabled:true,
 //             email: 'amitkumaranandaka123@gmail.com',
 //         password: 'engineer@1991',
 //         phone: '8630376691',
 //         role: 'admin',
 //         username: 'Amit',
 //         user: "63e0e1b3d69d1182b1c4cc34"});
 //         await staff.save();
 //     }
 //     catch(err){
 //         console.log(err.message);
 //     }
 // });
 
//  app.use("/api/webhook",webhookRoute);
 
 app.get("/",(req,res)=>{
     let ret = {status:"success",code:200,message:"Hi, start using the Amit Hari api server....hit a fork in the github repo"};
     res.status(200).json(ret);
 });
 
 
 
 // app.use("/api/*",function(req,res){
 //     let ret = {status:"success",code:71,message:"Welcome to the API server for Clumsy"};
 //     res.status(200).json(ret);
 //     // let ret={message:"API path not found",status:"failed"};
 //     // res.status(404).json(ret);
 // });
 
 /*app.get("/",(req,res)=>{
     let ret = {status:"success",code:71,message:"Hi, start using the api server....hit a fork in the github repo"};
     res.status(200).json(ret);
 })*/
 
 
 //static content 
 app.use('/content', express.static(__dirname + '/content/'));
 
 app.use('/img', express.static(__dirname + '/img/'));
 
 
 app.use("/*",function(req,res){
     console.log(req.path);
     let ret = {status:"success",code:71,message:"Hi, you have seem to have stumbled upon a missing link with path:"+req.path.toString()};
 
     res.status(404).end(JSON.stringify(ret));
     return;
 
 })
 
 
 // function performLogin(req, res, next)
 // {
 //     //this callback function is called after setup.js file function has returned, its just later in that pipeline, actually, the immediate next...
 //     passport.authenticate("local_strategy_user", function(err, user, info) {
 //         console.log("Entered authenticate");
 //         if (err) {
 //             console.log("err authenticate"+err);
 //             return res.status(400).json({ status:"failed",message:err });
 //         }
 
 //         if (!user) {
 //             console.log(1);
 //             console.log(info);
 //             return res.status(400).json({ status:"failed",message:info.message });
 //         }
 
 //         req.logIn(user, function(err) {
 //             if (err) {
 //                 console.log("err login");
 //                 return res.status(400).json({ status:"failed",message : err });
 //             }
 //             console.log("done authenticate");
 //             const { password, updated_at,created_at,email_is_verified, ...other } = user._doc;
 //             return res.status(200).json({ status:"success",message: `logged in ${user.id}`,user_id:user.id,user:{...other,id:other._id}});
 //         });
 //         console.log(2);
 //     })(req, res, next);
 // }
 
 // function performValidationUser(req, res, next)
 // {
 //     //this callback function is called after setup.js file function has returned, its just later in that pipeline, actually, the immediate next...
 //     passport.authenticate("jwt_user", { session: false },/*callback=>*/function(err, user, info) {
 //         console.log("Entered authenticate");
 //         if (err) {
 //             console.log("err authenticate"+err);
 //             return res.status(400).json({ status:"failed",message:err });
 //         }
 
 //         if (!user) {
 //             console.log(info);
 //             return res.status(400).json({ status:"failed",message:info.message });
 //         }
 
 //         req.logIn(user, function(err) {
 //             if (err) {
 //                 console.log("err login");
 //                 return res.status(400).json({ status:"failed",message : err });
 //             }
 //             console.log("done authenticate");
 //             // const { password, updated_at,created_at,email_is_verified, ...other } = user._doc;
 //             return res.status(200).json({ status:"success",message: `logged in ${user.id}`,user_id:user.id,user:user});
 //         });
 //     })(req, res, next);
 // }
 // app.get("/login",checkForLoggedIn,(req, res) => {res.render('pages/login_complete');});
 
 
 
 const server = http.createServer(app);
 
 
 //socket io!
 //-----------------------uncomment for socket io but do provide certificates!----------------------
 // const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
 // const socketApp = express();
 // socketApp.use(cors());
 
 // const socketServer = https.createServer({ 
 //                 key: fs.readFileSync('./secrets/privkey.pem'),
 //                 cert: fs.readFileSync('./secrets/fullchain.pem') 
 //              }, socketApp);
 
 // const options = { path:'/socket.io',transports: ['websocket'],origin: "*" , destroyUpgrade: false};
 
 // const io = require('socket.io')(socketServer, options);
 // io.use(wrap(passport.authenticate('jwt_param', { session: false })));
 // io.on('connection', socket => {
 //   console.log("connection established");
 
 //   let roomId=socket.handshake.query.room_id;
 
 
 //   if(roomId && mongoose.Types.ObjectId.isValid(roomId) && rooms.has(roomId))
 //   {
 //     console.log(socket.request.user);
 //     rooms.get(roomId).handleSocket(socket,io);
 //   }
 //   else
 //   {
 //     console.log("room_id not present");
 
 //     return;
 //   }
 // });
 
 // // app.use("/socket.io",passport.authenticate('jwt',{session:false}),function(req,res){console.log(req.headers);res.end();console.log(req.user);});
 // //Socketio ends
 
 // app.use("/api/rooms",passport.authenticate('jwt',{session:false}),ioAttacher, roomRouter);
 
 
 // function ioAttacher(req,res,next)
 // {
 //   req.io=io;
 //   next();
 // }
 
 
 // socketServer.listen(port+2);
 // server.listen(port);
 // console.log("NEONED71 API Server started at port:"+port);
 
 
 // // Listen on all IPv6 addresses (represented by '::') on the specified port
 // server.listen(port, '::', () => {
 //     console.log(`AMIT KUMAR ANAND API Server listening on all IPv6 addresses (::) on port: ${port}`);
 //   });
 
 // Listen on both IPv4 and IPv6 addresses (default behavior)
 server.listen(port, () => {
     console.log(`AMIT KUMAR ANAND API Server listening on both IPv4 and IPv6 addresses on port: ${port}`);
 });
 