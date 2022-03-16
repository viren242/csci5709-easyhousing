const { use } = require("../routes/userRoute");
//User Root
const userRoot = (req, res) => {
  try {
    res.setHeader("Content_type", "application/json");
    res
      .status(200)
      .json({ message: "Welcome to User Management Module", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = { userRoot };
