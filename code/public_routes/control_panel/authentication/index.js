const express = require("express");
const router = express.Router();
const passport = require("passport");


const { v4: uuidv4 } = require('uuid');
var validator = require("email-validator");
const bcrypt = require("bcrypt");
const User = require("../../../databases/system/users");

const {performLoginPanel,performValidationPanel} = require('../../../utility/authentication_functions');

router.post("/login",async function(req,res,next){
    performLoginPanel(req,res,next);
});

router.get("/whoami", performValidationPanel, async function(req,res,next){
	var ret = {};
	if(req.user)
	{
    	// console.log(req.user);
    	ret.data=req.user;
    	ret.status="success";
    	res.status(200).json(ret);	

	}
	else
	{
		ret.status="failed";
		res.status(403).json(ret);
	}
console.log("whoami complete");
});

// router.get("/logout", async function(req,res,next){
// 	if(req.user)
// 	{
// 		req.logout();
//     }
// 	ret.status="success";
//     res.status(200).json(ret);  
//     // console.log("logout complete");
// });


// router.get("/logout", async function(req, res, next) {
//     let ret = { status: "success" };

//     if (req.user) {
//         req.logout(function(err) {
//             if (err) {
//                 return next(err);
//             }
//             ret.message = "User logged out successfully";
//             res.status(200).json(ret);
//         });
//     } else {
//         ret.status = "failure";
//         ret.message = "No user to log out";
//         res.status(200).json(ret);
//     }
// });




// router.post("/logout", async function(req, res, next) {
//     let ret = { status: "success" };

//     if (req.user) {
//         req.logout(function(err) {
//             if (err) {
//                 return next(err);
//             }
//             ret.message = "User logged out successfully";
//             res.status(200).json(ret);
//         });
//     } else {
//         ret.status = "failure";
//         ret.message = "No user to log out";
//         res.status(200).json(ret);
//     }
// });


// router.post("/logout", async function(req, res, next) {
//     let ret = { status: "success" };

//     if (req.user) {
//         req.logout(function(err) {
//             if (err) {
//                 return next(err);
//             }
//             req.session.destroy(function(err) {
//                 if (err) {
//                     return next(err);
//                 }
//                 ret.message = "User logged out successfully";
//                return res.status(200).json(ret);
//             });
//         });
//     } else {
//         ret.status = "failure";
//         ret.message = "No user to log out";
//         res.status(200).json(ret);
//     }
// });

router.post("/logout", async function(req, res, next) {
    let ret = { status: "success" };

    // Handle session-based logout
    if (req.user) {
        req.logout(function(err) {
            if (err) {
                return next(err);
            }
            req.session.destroy(function(err) {
                if (err) {
                    return next(err);
                }
                ret.message = "User logged out successfully (session-based)";
                // Clear session cookie (e.g., 'connect.sid' for express-session)
                res.clearCookie('connect.sid');  
                return res.status(200).json(ret);
            });
        });
    } else {
        // Handle token-based logout (client-side)
        ret.message = "User logged out successfully (token-based)";
        // Clear the JWT token cookie (assuming the cookie is named 'token')
        res.clearCookie('token');  // JWT stored in cookie
        return res.status(200).json(ret);
    }
});


// ### Summary:
// - **Session-based logout**: Destroy the session on the server and clear the session cookie on the client.
// - **JWT-based logout**: Invalidate or delete the token on the client side (by removing it from localStorage, cookies, etc.). The server doesn't need to track tokens in JWT-based authentication.

// In this case, there is no need to invalidate the JWT on the server side because it's stateless.
//  The client (e.g., a browser or mobile app) must remove the token from storage (such as localStorage or cookies).
// The server does not need to track the token.
//  The client is simply informed that the logout request was successful, and it's the client's job to delete the token.

//  Logout in the Context of Cookies (JWT or Sessions)

// If you're using cookies (e.g., with session IDs or JWT tokens), logging out might involve deleting the cookie from the client.

// Session-based logout (for session auth like Passport):
// req.logout() removes the user from the session.
// req.session.destroy() clears the session data.
// res.clearCookie('connect.sid') clears the session cookie, ensuring that the user is logged out on the client side as well.
// Token-based logout (for JWT auth):
// JWT tokens are typically stored in cookies or localStorage.
// res.clearCookie('token') deletes the JWT token cookie, logging the user out. 
// On the client side, you will need to delete the JWT token from localStorage or sessionStorage as well (in case the token is stored there).
// Since JWT is stateless, you don't need to manage or track the token server-side.

// Important Considerations:

// Session Management: For session-based logout, you're correctly managing the server-side session and session cookie.
// JWT Token Management: For token-based logout, you're removing the token from the client's cookies,
//  but remember to also clear the token from client-side storage (localStorage or sessionStorage) in the client-side code.













// const tokenBlacklist = new Set(); // In-memory token blacklist

// // Middleware to check if the token is blacklisted
// function checkTokenBlacklist(req, res, next) {
//     const authHeader = req.headers.authorization;
//     if (authHeader) {
//         const token = authHeader.split(' ')[1]; // Extract the token from the Authorization header
//         if (tokenBlacklist.has(token)) {
//             return res.status(401).json({ message: "Token is blacklisted" });
//         }
//     }
//     next();
// }

// // Use the middleware in your routes
// router.use(checkTokenBlacklist);



// router.post("/logout", async function(req, res, next) {
//     let ret = { status: "success" };

//     if (req.user) {
//         const token = req.headers.authorization.split(' ')[1]; // Extract the token from the Authorization header

//         req.logout(function(err) {
//             if (err) {
//                 return next(err);
//             }
//             req.session.destroy(function(err) {
//                 if (err) {
//                     return next(err);
//                 }
//                 // Add the token to the blacklist
//                 tokenBlacklist.add(token);
//                 ret.message = "User logged out successfully";
//                 res.status(200).json(ret);
//             });
//         });
//     } else {
//         ret.status = "failure";
//         ret.message = "No user to log out";
//         res.status(200).json(ret);
//     }
// });



module.exports = router;
