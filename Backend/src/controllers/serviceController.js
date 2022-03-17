const { services } = require("../models"); 
const { use } = require("../routes/serviceRoute");

const serviceRoot = (req, res) => {
  try {
    res.setHeader("Content_type", "application/json");
    res
      .status(200)
      .json({ message: "Welcome to service Module", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const getAllServices = async (req,res) => {
    const listOfServices = await services.findAll();
    res.json(listOfServices);
}

const addService =  async (req,res) => {
    const s = req.body;
    try{
        await services.create(s).then(() => {
            res.json(s);
        });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

module.exports = { serviceRoot };
module.exports = { getAllServices, addService };
