const extractSubmissionInfo = require('./extract-submission-info');
const processSurveyResponse = require('./process-survey-response');

module.exports.webhook = async (event) => {
  const body = JSON.parse(event.body);
  const submissionInfo = extractSubmissionInfo(body);
  await processSurveyResponse(submissionInfo);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN
    }
  };
};
