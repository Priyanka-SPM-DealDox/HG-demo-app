const jwt = require('jsonwebtoken')
const people = require('../models/peopleModel');
const admin = require('../models/adminModel');


const requireAuth = async (req, res, next) => {
 
  // verify user is authenticated
  const { authorization } = req.headers
  

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  const token = authorization.split(' ')[1]
  console.log("TOKEN "+token);

  try {
    const { _id } = jwt.verify(token, process.env.SECRET)

    const adminResult = await admin.findOne({ _id: _id });

    if (!adminResult) {
      const peopleResult = await people.findOne({ _id: _id });
      req.user = peopleResult;
    } else {
      req.user = adminResult;
    }

    if(req.user){
    next()
    }else{
      res.status(401).json({error: 'Request is not authorized'})
    }

  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

module.exports = requireAuth