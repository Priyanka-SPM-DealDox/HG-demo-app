const express = require('express');

//Authhentication
const requireAuth = require('../middleware/requireAuth');

//controller function
const { addSurvey, addSurveyQuestions, addSurveySections, getSurvey, getSurveySections, getSurveyQuestions, getSurveyGuidedSelling,deleteSurvey, getSurveyQuestionsguidedSelling, getSurveyNames, deleteSurveyQuestion,  } = require('../controllers/surveyController');

const { addSurveyRules, addSurveyActions, getSurveyRules, getSurveyActions, templateMergeData, getSurveyGuidedSellingActions, getSurveyGuidedSellingRules } = require('../controllers/surveyRulesActionsController');

const { addGuidedSellingQuestions, addGuidedSellingSections, getGuidedSellingQuestionAnswers, updateGuidedSellingQuestion } = require('../controllers/guidedSellingController');

const router = express.Router()

//require auth for all routes
router.use(requireAuth)


// Survey routes
router.post('/addSurvey', addSurvey); // Endpoint for adding surveys
router.post('/getSurvey', getSurvey);
router.post('/getSurveyNames', getSurveyNames);


// Survey Questions routes
router.post('/addSurveyQuestions', addSurveyQuestions);

//Survey Section routes 
router.post('/addSurveySections', addSurveySections);
router.post('/getSurveySections', getSurveySections);
router.post('/getSurveyQuestions', getSurveyQuestions);
router.post('/getSurveyQuestionsguidedSelling', getSurveyQuestionsguidedSelling);
router.put('/updateGuidedSellingQuestion/:queAnswerId', updateGuidedSellingQuestion);
router.post('/deleteSurveyQuestions', deleteSurveyQuestion);


// Survey Rules routes
router.post('/addSurveyRules', addSurveyRules);
router.post('/getSurveyRules', getSurveyRules);
router.post('/getSurveyGuidedSellingRules', getSurveyGuidedSellingRules);


//Survey Actions routes
router.post('/addSurveyActions', addSurveyActions);
router.post('/getSurveyActions', getSurveyActions);
// for template merge
router.post('/getTemp', templateMergeData);
router.post('/getSurveyGuidedSellingActions', getSurveyGuidedSellingActions);


// GuidedSellingQuestions routes
router.post('/addGuidedSellingQuestions', addGuidedSellingQuestions);
router.post('/getGuidedSellingQuestionAnswers', getGuidedSellingQuestionAnswers);

// GuidedSellingSections routes
router.post('/addGuidedSellingSections', addGuidedSellingSections);
router.post('/getSurveyGuidedSelling', getSurveyGuidedSelling);
router.post('/deleteSurvey', deleteSurvey);

module.exports = router;

