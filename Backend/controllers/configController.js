const Config = require('../models/configModel');

const addConfig = async (req, res) => {
    const {value1,value2,value3,value4,value5,value6,value7,value8} = req.body;
    console.log(req.body);
    try {
          const config_data = await Config.create({value1,value2,value3,value4,value5,value6,value7,value8});
        //   console.log(config_data)
          if(config_data){
              res.status(200).json({success:"Successsssss"})
          }else{
              res.status(200).json({error: "Failed"})
          }
        } catch (error) {
          res.status(200).json({error: "Failed"})
        }
}

const getConfig = async (req, res) => {
    try {
      const config_data = await Config.find();
      if (!config_data) {
        res.status(200).json({ status: "Failed", message: "config Data Not Found" });
      } else {
        res.status(200).json({ data: config_data });
      }
    } catch (error) {
      res.status(200).json({ error: "Failed" });
    }
  };

  

const updateConfig = async (req, res) => {
    const config_id = req.params.id;
    console.log(config_id);
  
    const {value1,value2,value3,value4,value5,value6,value7,value8} = req.body;
  
    try {
      const updateConfig = await Config.updateOne(
        {
          // user_id: user_id,
          _id: config_id,
      },
      {
        $set:
        {value1,value2,value3,value4,value5,value6,value7,value8},
      }
      );
  
      if(updateConfig){
        res.status(200).json({status: "Success", message: "config Updated"});
      }else {
        res.status(404).json({ status: "Error", message: "config Not Found" });
      }
    }catch (error) {
      console.error("Error updating config:", error);
      res.status(500).json({ error: "Failed to Update config" });
    }
  };


module.exports = { addConfig,getConfig,updateConfig }
