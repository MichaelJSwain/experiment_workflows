import 'dotenv/config';
import { getOptlyExp } from './getOptlyExp.js';
import { getOptlyTargeting } from './getOptlyTargeting.js';
import { getJiraTicket } from './getJiraTicket.js';
const {EMAIL, URL, JIRA_AUTH_TOKEN, TICKET_ID, DT_AUDIENCE, MB_AUDIENCE, QA_AUDIENCE} = process.env;

function parseTargeting(targeting) {
  // Clean up the input by removing escape characters (like \n, \r, etc.)
  const cleanedPayload = targeting.replace(/\\n/g, '\n').replace(/\\r/g, '');

  // Split the payload by lines to process line by line
  const lines = cleanedPayload.split('\n');
  
  const result = {};

  // Process each line to capture key-value pairs
  lines.forEach(line => {
    // Look for lines that match the pattern # *Key*:
    const match = line.match(/^# \*([^*]+)\*[:]*\s*(.*)$/);
    if (match) {
      const key = match[1].trim().split(":")[0].split("(")[0].split(" ").join("_").toLowerCase();  // The key without the asterisks
      const value = match[2].trim();  // The value after the colon
      result[key] = value;  // Store the key-value pair in the result
    }
  });

  return result;
}

function parseAnalyticsVariables(payload) {
  // Clean up the input by removing escape characters (like \n, \r, etc.)
  const cleanedPayload = payload.replace(/\\n/g, '\n').replace(/\\r/g, '');

  // Use regex to match any content inside {{ ... }} (representing the custom analytics events)
  const regex = /{{([^}]+)}}/g;
  
  const variables = [];
  let match;

  // Find all matches in the payload
  while ((match = regex.exec(cleanedPayload)) !== null) {
    variables.push(match[1].trim());  // Store each variable (inside {{ ... }})
  }

  return variables;
}

const parseJiraTicketDetails = (details) => {
  const targetDetails = details.split('Targeting details')[1].split("Primary goal")[0];
  const goalDetails = details.split('Diagnostic goals')[1].split("Criteria")[0];
  const parsedTargtingDetails = parseTargeting(targetDetails);
  const parsedGoalDetails = parseAnalyticsVariables(goalDetails);

  return {
    targeting: parsedTargtingDetails,
    goals: parsedGoalDetails
  }
}

const validateLocales = (expTargeting, targetedLocales) => {
  if (targetedLocales.toLowerCase() === "big7" && expTargeting.includes("uk|nl|de|fr|it|es|pl")) {
    console.log("domain targeting error");
    return true;
  } else if (targetedLocales.toLowerCase() === "big6" && expTargeting.includes("uk|nl|de|fr|it|es")) {
    return true;
  }
  return false;
}

const validateAudience = (expAudiences, targetedAudiences) => {
  const mobileAndDesktop = /^(?=.*\b(dt|desktop|d)\b)(?=.*\b(mb|mobile|m)\b).*/;
  const desktopOnly = /^(?!.*\b(mb|mobile|m)\b).*\b(dt|desktop|d)\b/;
  const mobileOnly = /^(?!.*\b(dt|desktop|d)\b).*\b(mb|mobile|m)\b/;

  if (mobileAndDesktop.test(targetedAudiences) && (expAudiences.includes(MB_AUDIENCE) && expAudiences.includes(DT_AUDIENCE))) {
    return true;
  } else if (desktopOnly.test(targetedAudiences) && (expAudiences.includes(DT_AUDIENCE) && !expAudiences.includes(MB_AUDIENCE))) {
    return true;
  } else if (mobileOnly.test(targetedAudiences) && (!expAudiences.includes(DT_AUDIENCE) && expAudiences.includes(MB_AUDIENCE))) {
    return true;
  } 

  return false;
}

const validateCustomGoals = (experiment, goalsInTicket) => {
  // return if no goals were defined in the ticket
  if (!goalsInTicket.length) {
    return true;
  }

  let customGoalsShared = false;
  let customGoalsVariant = false;

  // check for call to optimizely.sendAnalyticsEvents in the shared code
  if (experiment.changes) {
      const sharedJS = experiment.changes.find(c => c.type === "custom_code");
      
      if (sharedJS && sharedJS.value.includes("optimizely.sendAnalyticsEvents")) {
          customGoalsShared = true;
      }
  }

  // check for call to optimizely.sendAnalyticsEvents in the variant code
  if (experiment.variations) {
      experiment.variations.forEach(variation => {
          if (variation.actions && variation.actions.length) {
              variation.actions.forEach(action => {
                  action.changes.find(change => {
                      if (change.type === "custom_code" && change.value.includes("optimizely.sendAnalyticsEvents")) {
                          customGoalsVariant = true;
                      }
                  })
              })
          }
      });
  }

  return customGoalsShared || customGoalsVariant ? true : false;
}

const validateExpConfig = (optlyExp, jiraTicket) => {
  const {targeting, goals} = jiraTicket;

  // check locales
  const isValidLocale = validateLocales(optlyExp.page_configs[0].conditions, targeting.domain);
  
  // check page type e.g. PDP
  
  // check device (audience)
  const isValidAudience = validateAudience(optlyExp.audience_conditions, targeting.device.toLowerCase());

  // check activation mode

  // check changes seen

  // check custom goals
  const isValidCustomGoals = validateCustomGoals(optlyExp, goals);

  return {
    isValid: !!isValidLocale && !!isValidAudience && !!isValidCustomGoals
  }
}

const validateExpStatusChange = (expID) => {
  const optlyExp = getOptlyExp(expID);
  const expWithTargeting = getOptlyTargeting(optlyExp);
  
  const jiraTicket = getJiraTicket();
  const parsedJiraDetails = parseJiraTicketDetails(jiraTicket);
  
  const res = validateExpConfig(expWithTargeting, parsedJiraDetails)
  
  if (res.isValid) {
    // proceed with status change
    console.log("successfully changed exp status");
  } else {
    // block action
    console.log("please resolve issues with exp config and try again");
  }
}
// on status change
validateExpStatusChange(293489832);