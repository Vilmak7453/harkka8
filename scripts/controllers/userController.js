"use strict";
var User = require('../models/User');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.register_user =  [

    // Validate fields.
    body('name').trim().isLength({ min: 1}).withMessage('Username is required. 1-20 characters.'),
    body('password1').trim().isLength({ min: 1, max: 20 }).withMessage('Password is required. 1-20 characters.'),
    body('password2').custom((value, {req, loc, path})=>{
    	if(value !== req.body.password1)
    		throw new Error("Passwords don't match");
    	else
    		return value;}).withMessage("Passwords don't match"),

    // Sanitize fields.
    sanitizeBody('name').trim().escape(),
    sanitizeBody('password1').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('register', { title: 'Register new user', name: req.body.name , errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Create an Author object with escaped and trimmed data.
            var user = new User(
                {
                    name: req.body.name,
                    password: req.body.password1
                });
            user.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new author record.
                console.log("User registered and saved: " + this.name);
                res.redirect("/game");
            });
        }
    }
];