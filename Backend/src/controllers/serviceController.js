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
    try{
        const listOfServices = await services.findAll();
        res.setHeader("Content_type", "application/json"); 
        res.status(200).json(listOfServices);
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

const addService =  async (req,res) => {
    try{
        const s = req.body;
        await services.create(s).then(() => {
            res.status(200).json(s);
        });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

const editService = async (req,res) => {
    try{
        const id = req.params.id;
        await services.update(req.body, {
            where:{
                id: id
            }
        })
        const s = await services.findByPk(id); 
        res.status(200).json(s);
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
}

const getService = async (req,res) => {
    try{
        const id= req.params.id;
        const s = await services.findByPk(id);
        res.status(200).json(s);
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }    
}

module.exports = { serviceRoot };
module.exports = { getAllServices, addService, editService, getService };
