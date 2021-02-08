/**
 * We perform the actions that we want to have happen
 * when we receive a survey response in this module.
 */

// Import polyfills that arcgis-rest-js requires in order to work
import 'cross-fetch/polyfill';
import 'isomorphic-form-data';

// Import arcgis-rest-js routines
import { addGroupUsers, createGroupNotification, removeGroupUsers } from "@esri/arcgis-rest-portal";
import { UserSession } from "@esri/arcgis-rest-auth";

// Import our message template
import * as generateMessage from './message-template.hbs';

// Create an authentication object from the environment variables
const session = new UserSession({
  username: process.env.AGO_USERNAME,
  password: process.env.AGO_PASSWORD
});
// Community org authentication
const communitySession = new UserSession({
  username: process.env.AGO_COMMUNITY_USERNAME,
  password: process.env.AGO_COMMUNITY_PASSWORD
});

// Maps categories of people to the groups they should be added to
const groupsMap = {
  science: 'ed3a703257784827b71859baeb4da3eb',
  'non-profit': '',
  technology: '',
  education: ''
};

// When users are in this group, we show them the survey.
// So, once they've responded to the survey, we remove them.
const welcomeGroupId = '26843de4d6ab4cc08c01f7fa9a193f04';

export async function processSurveyResponse(submissionInfo) {
  // Add user to appropriate group
  const subjectGroupId = groupsMap[submissionInfo.industry];
  const addRes = await addGroupUsers({
    id: subjectGroupId,
    users: [submissionInfo.username],
    authentication: session
  });

  // If no error, remove them from welcome group and send a notification
  if (!addRes.errors) {
    await removeGroupUsers({
      id: welcomeGroupId,
      users: [submissionInfo.username],
      // the welcome group is in the community org, so we need to use
      // the community org authentication object
      authentication: communitySession
    });

    const message = generateMessage({
      firstName: submissionInfo.firstName,
      industry: submissionInfo.industry
    });

    await createGroupNotification({
      id: subjectGroupId,
      users: [submissionInfo.username],
      subject: 'You\'ve Unlocked Some Content!',
      message,
      authentication: session
    });
  }
}