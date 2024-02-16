
var cors = require('cors')
const express = require('express')
const path= require('path')
const multer = require('multer');
require('dotenv').config();
const mongoose = require('mongoose');
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");
// import { Logger } from "mongodriver";

const adminRoutes = require('./routes/admin');
const accountRoutes = require('./routes/accounts');
const opportunityRoutes = require('./routes/opportunity');
const companyRoutes = require('./routes/company');
const configRoutes = require('./routes/config');
const doctypRoutes = require('./routes/doctype');
const templateRoutes = require('./routes/template');
// const peopleRoutes = require('./routes/admin');
const contentRoutes = require('./routes/content');
const quotesRoutes = require('./routes/quotes');
const guidedSellingRoutes = require('./routes/guidedSelling');

const securityRoutes = require('./routes/security');
const roleRoutes = require('./routes/roles');
const lookupsRoutes = require('./routes/lookups');
const lookups_dataRoutes = require('./routes/lookups_data');
const surveyRoutes = require ('./routes/survey');
const spreadsheetRoutes = require('./routes/spreadsheet');
// const supportRequest = require('./routes/help');
const accessRoutes = require('./routes/access');
const peopleDataRoutes = require('./routes/people');
const quoteGridRoutes = require('./routes/quoteGrid');
// const surveyActionsRoutes = require('./routes/surveyActions')
// const formulaRoutes = require('./routes/surveyFormula')

// express app
const app = express()
// Increase payload limit for JSON and form data
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: '200mb', extended: true }));

// Configure multer to handle file uploads
const storage = multer.memoryStorage(); // This stores the file in memory, you can configure it to save to disk if needed.
const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 5 } }); // 5MB limit
// Define a route to handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  // Access the uploaded file through req.file
  const file = req.file;

  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  // Process the file as needed (e.g., save to database, perform further operations)
  // In this example, we're just sending back a JSON response with the file details.
  res.json({
    originalname: file.originalname,
    encoding: file.encoding,
    mimetype: file.mimetype,
    size: file.size,
  });
});

app.use(cors());
app.options('*', cors());

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next()
})

// routes
app.use('/api/admin', adminRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/opportunity', opportunityRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/config', configRoutes);
app.use('/api/doctype', doctypRoutes);
app.use('/api/template', templateRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/security', securityRoutes);
app.use('/api/quotes', quotesRoutes);
app.use('/api/guidedselling', guidedSellingRoutes);

app.use('/api/roles', roleRoutes);
app.use('/api/lookups', lookupsRoutes);
app.use('/api/lookups_data', lookups_dataRoutes);
app.use('/api/survey', surveyRoutes);
app.use('/api/spread', spreadsheetRoutes);
// app.use('/api/help', supportRequest);
app.use('/api/access', accessRoutes);
app.use('/api/people', peopleDataRoutes);
app.use('/api/quoteGrid', quoteGridRoutes);

// app.use('/api/surveyFormula',formulaRoutes)
// app.use('/api/surveyActions',surveyActionsRoutes)
// Logger.setLevel("debug");

app.use('/Images', express.static(path.join(__dirname, 'Images')));

// app.listen(process.env.PORT, () => {
//   console.log('connected to db & listening on port', process.env.PORT)
// })

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title : "Dealdox Api Document",
      version : "1.0.0",
      description: 
      "This is A Api Documentation for DealDox Application",
    },
    servers: [
      {
        url: "http://localhost:4001",
      },
    ],
  },
  apis: ['./routes/*.js'],
};
const spacs = swaggerjsdoc(options);
app.use(
  "/api-docs",
  swaggerui.serve,
  swaggerui.setup(spacs),
)




mongoose.set('debug', true);
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })