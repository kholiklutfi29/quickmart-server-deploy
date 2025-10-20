import UserService from "../services/userService.js";

const UserController = {
  register: async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const newUser = await UserService.register(username, email, password);
      res
        .status(201)
        .json({ message: "User created successfully", data: newUser });
    } catch (error) {
      console.error("Register error:", error);
      res.status(500).json({ error: error.message });
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await UserService.login(email, password);
      res.status(200).json({ message: "Login success", data: user });
      console.log(`User ${user.username} has logged`);
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: error.message });
    }
  },
};

export default UserController;
