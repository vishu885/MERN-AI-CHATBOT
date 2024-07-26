import User from "../models/User.js";
export const getAllUsers = async (req, res, next) => {
    //get all users from database
    try {
        const users = await User.find();
        return res.status(200).json({ message: "OK", users });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ message: "ERROR", cause: error });
    }
};
//# sourceMappingURL=userController.js.map