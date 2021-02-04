import { extractSubmissionInfo } from './extract-submission-info';
import { processSurveyResponse } from './process-survey-response';

// This "event" parameter comes from AWS API Gateway
export async function webhook (event) {
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
