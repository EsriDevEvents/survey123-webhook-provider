/**
 * We perform the actions that we want to have happen
 * when we receive a survey response in this module.
 */

import 'cross-fetch';
import { addGroupUsers } from "@esri/arcgis-rest-portal";
import { UserSession } from "@esri/arcgis-rest-auth";

// Create an authentication object
const session = new UserSession({
  username: process.env.AGO_USERNAME,
  password: process.env.AGO_PASSWORD
});

// Maps categories of people to the groups they should be added to
const groupsMap = {
  science: '7620525dc4eb4df095fa5d1f1a7c1f0b',
  'non-profit': '',
  technology: '',
  education: ''
}

export async function processSurveyResponse(submissionInfo) {
  await addGroupUsers({
    id: groupsMap[submissionInfo.industry],
    users: [submissionInfo.username],
    authentication: session
  });
}