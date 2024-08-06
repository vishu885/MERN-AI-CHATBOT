import {body} from 'express-validator';

//array to declare validations during user login
export const loginValidator=[
    body("email").trim().isEmail().withMessage("E-Mail is required"),
    body("password").trim().isLength({min:4}).withMessage("Password is required and 4 characters long")
]