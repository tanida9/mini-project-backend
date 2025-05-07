import { User } from "../../../models/User.js";


//ท่าที่ทำมันเป็น objects
export const userControllers = {
  getAllUsers: async (req, res) => {
    try {
      // exclude passwords in the result
      const users = await User.find().select("-password").sort("-createdAt");
      res.json({ error: false, users });
    } catch (err) {
      res.status(500).json({
        error: true,
        message: "Failed to fetch users",
        details: err.message,
      });
    }
  },

  createUser: async (req, res) => {
      const { name, email, password } = req.body;
      if (!password) {
        return res
          .status(400)
          .json({ error: true, message: "Password is required" });
      }
      if (!name) {
        return res.status(400).json({ error: true, message: "Name is required" });
      }

      if (!email) {
        return res.status(400).json({ error: true, message: "Email is required" });
      }

      try {
        // prevent duplicates
        const existing = await User.findOne({ email });
        if (existing) {
          return res
            .status(409)
            .json({ error: true, message: "Email already in use" });
        }

        // create & save
        const user = new User({ name, email, password });
        await user.save();

        return res
          .status(201)
          .json({ error: false, user, message: "User created successfully" });
      } catch (err) {
        return res
          .status(500)
          .json({ error: true, message: "Server error", details: err.message });
      }
    },

  loginUser: async (req, res) => {
    const { fullname, email, password } = req.body;
  
    if (!fullname || !email || !password) {
      return res
        .status(400)
        .json({ error: true, message: "Name, Email and password are required" });
    }
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(401)
          .json({ error: true, message: "Invalid credentials" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ error: true, message: "Invalid credentials" });
      }
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ error: false, token, message: "Login successful" });
    } catch (err) {
      res
        .status(500)
        .json({ error: true, message: "Server error", details: err.message });
    }
  },
};



