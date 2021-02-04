/**
 * We perform the actions that we want to have happen
 * when we receive a survey response in this module.
 */

// Import polyfills that arcgis-rest-js requires in order to work
import 'cross-fetch/polyfill';
import 'isomorphic-form-data';

// Import arcgis-rest-js routines
import { addGroupUsers, createGroupNotification } from "@esri/arcgis-rest-portal";
import { UserSession } from "@esri/arcgis-rest-auth";

// Create an authentication object from the environment variables
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
  // Add user to appropriate group
  const subjectGroupId = groupsMap[submissionInfo.industry];
  const addRes = await addGroupUsers({
    id: subjectGroupId,
    users: [submissionInfo.username],
    authentication: session
  });

  // If no error, send a notification
  if (!addRes.errors) {
    await createGroupNotification({
      id: subjectGroupId,
      users: [submissionInfo.username],
      subject: 'You\'ve Unlocked Some Content!',
      message: `Welcome, ${submissionInfo.firstName}.`,
      authentication: session
    });
  }
}