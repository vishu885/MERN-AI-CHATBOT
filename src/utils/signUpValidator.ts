import { NextFunction,Request, Response } from "express"
import { body, ValidationChain, validationResult } from "express-validator";
import { loginValidator } from "./loginValidator.js";

//array to declare validations during user signup
export const signUpValidator=
     [
        body("name").notEmpty().withMessage("Name is required"),
        ...loginValidator
     ];


//middleware function to check those validation on user signup

export const validate = (validations: ValidationChain[]) => {
    console.log("INSIDE VALIDATOR");
  return async (req: Request, res: Response, next: NextFunction) => {
    // Run all validations in sequence
    for (let validation of validations) {
      const result = await validation.run(req); //Iterates over each validation rule in the validations array.
                                                //Calls await validation.run(req) to execute the validation against the request.
        console.log("VALIDATION RESULT ", result.array());   // If any validation rule fails (!result.isEmpty()), the loop breaks.
      if (!result.isEmpty()) {
        break;
      }
    }

    // Collect validation errors
    const errors = validationResult(req); //Collects all validation errors from the request using validationResult.
    console.log("VALIDATION ERRORS ",errors.array());
    if (errors.isEmpty()) {
      return next();
    }

    // Send validation errors response
    return res.status(422).json({ errors: errors.array() });
  };
};


