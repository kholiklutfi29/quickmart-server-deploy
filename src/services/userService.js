import bcrypt from "bcrypt";
import UserModel from "../models/userModel.js";

const UserService = {
    register: async (username, email, password) => {
        const existingUser = await UserModel.findByEmail(email);
        if(existingUser) {
            throw new Error("Email has been used");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await UserModel.createUser(username, email, hashedPassword);
        return newUser;
    },

    login: async(email, password) => {
        const user = await UserModel.findByEmail(email);
        if(!user) {
            throw new Error("Email not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            throw new Error("Wrong password");
        }

        return {
            user_id: user.user_id,
            username: user.username,
            email: user.email
        };
    }
};

export default UserService;