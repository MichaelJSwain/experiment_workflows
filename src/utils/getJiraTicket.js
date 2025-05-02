const fakeJiraPayload = JSON.stringify({
    "expand": "renderedFields,names,schema,operations,editmeta,changelog,versionedRepresentations",
    "id": "640487",
    "self": "https://pvhcorp.atlassian.net/rest/api/2/issue/640487",
    "key": "CX-1205",
    "fields": {
      "description": "h2. NOTES\n\nh2. HYPOTHESIS\n\nWe know having certainty around payment options is important for users, especially on mobile. By displaying the payment options clearly on PDP as a drop down, one of the main landing pages for the website, we expect to create more reassurance for users to add the product to their bag and later convert.\n\nKey Metrics:\n\n* A2B\n* CVR\n\nh2. Priority score\n\nImpact: 7 * Confidence: 7 * Ease: 7 = *21*\n\nh2. OPPORTUNITY\n\nWe know from the Payment preferences survey that some respondents are missing some of the already available payment methods, like Klarna and Credit Card – indicating that visitors may need reassurance in the payment methods offered at checkout. However, on PDP this information is almost completely missing - and when tested from the footer on TH, which has low visibility.  TH359 showed by displaying payment methods in the Footer, visitors were more likely to add a product to cart (V1: +0,7% | V2: +0,5%, trend) while Conversion Rate remained flat - we did see positive trends on lower funnel metrics for V2. \n\nA positive impact on AOV after Returns was also observed for mobile visitors in V2 (+1,2%). We also seen a trending positive *effect in the mobile experience* where availability of payment methods may be *increasingly relevant with mobile pay options like apple pay now available (which was not the case durng TH359)*. We seen that when mobile visitors  land on the  PDP in the variant with  payment options highlighted (V2)-  we see a 0.8% significant uplift on A2B and a positive trend on CVR. \n\nBy displaying the payment options on PDP either clearly on the page or as a drop down, we expect to create more reassurance for users to add the product to their bag and later convert.\n\n*Proof from Data Source:* \n\n*Related experiments:* \n\n* [TH359 - Display accepted payment methods in Footer (sitewide) - DT+M|https://airtable.com/appo3CifYBshf557f/pagU2ktjkKRvKMQnw?detail=eyJwYWdlSWQiOiJwYWdmMDhUVnFORlk5dVNqbiIsInJvd0lkIjoicmVjdDVDazdIdUFSWjhrQUIiLCJzaG93Q29tbWVudHMiOmZhbHNlLCJxdWVyeU9yaWdpbkhpbnQiOm51bGx9]\n* [https://pvhcorp.atlassian.net/browse/CX-137|https://pvhcorp.atlassian.net/browse/CX-137|smart-link] \n\nh2. Recommendation\n\n*Recommended change(s):* \n\nV0 - Control\n\nV1 - Payment methods visible on the PDP \n\nV2 - Add the payment options visibly below the product information as a drop down(See RL example)\n\n*Recommended next step(s):* \n\nh2. DESIGN\n\nh2. Overview\n\nDesigner: [~accountid:63088b4152aa1a8eaab66b9f] \n\nDesign Link: [https://www.figma.com/design/Sqg5A2usmy2RvPMb4qKDHF/PDP---Discovery%2FExperiments?node-id=7044-4248&m=dev&focus-id=7464-12374|https://www.figma.com/design/Sqg5A2usmy2RvPMb4qKDHF/PDP---Discovery%2FExperiments?node-id=7044-4248&m=dev&focus-id=7464-12374|smart-link] \n\nh2. *Variant 1:*\n\n Payment methods under the USPs\n\nh2. *Variant 2:* \n\nPayment methods under Product Details\n\nOBS: payment methods vary depending on locale, check with Justyna which ones are valid and for which locale and where to find the icons.\n\nh2. VALIDATION (by Analyst)\n\n*Runtime calculation*\n\nEstimated runtime (in weeks): \n\nCK:\n\n* 7 weeks at 1,75% MDE for CVR\n\nTH:\n\n* 6 weeks at 1,5% MDE for CVR\n\nh2. Targeting details\n\n# *Domain(s):* Big7\n# *Page(s):* PDP\n# *Device(s):* DT + M\n# *Experiment activation mode:* Immediate for Desktop, for Mobile just before the product details are scrolled into view (*see screenshot).\n# *Changes seen* [*more info*|https://pvhcorp.atlassian.net/wiki/spaces/PVHEU/pages/737706044/Changes+Seen+Implementation+Guide]*:* yes, on top of the conditional activation, please also add a changes seen. Choose the midway point between the product details and USPs as the visibility target.**\n\n\n\n*Experiment activation mode\n\n!Screenshot 2025-02-07 at 09.13.40 (34930930-67bf-4f55-8282-25789b9c9072).png|width=16.666666666666668%,alt=\"Screenshot 2025-02-07 at 09.13.40.png\"!\n\n**Changes seen\n\n!Screenshot 2025-02-07 at 14.32.06.png|width=16.666666666666668%,alt=\"Screenshot 2025-02-07 at 14.32.06.png\"!\n\n\n\nh2. Primary goal\n\nConversion rate\n\nh2. Secondary goals\n\n_To determine impact on business goals_\n\n# Default: Conversion rate per unique visitor or per session (source: Adobe )\n# Default: Average order value (source: Adobe )\n# Default: Order frequency per unique visitor (source: Adobe )\n# Default: Return Rate (source: Adobe)\n# CTR of different payment options in checkout (source: Adobe)\n# Add to bag rate (source: Adobe)\n\nh2. Diagnostic goals\n\n_To determine the why behind the results_\n\n# {{CX-1205 Changes Seen}} (all variants, when payment methods are in viewport) (ADOBE NEW)\n# {{CX-1205 Clicks on Payment method}} (V1 + V2, clicks on payment methods, even when they will not be clickable) (ADOBE NEW)\n\n----\n\nh2. Criteria necessary for monitoring / evaluating experiments:\n\n# Please ensure that the title of experiment in Optimizely contains a test ID (ex. CK281, TH198)\n# The CXO program manager will assign a test ID to the experiment as soon as the Asana ticket has been created.\n# Clear naming of the variants in Optimizely (ex. \"control\" vs \"v1 - added banner\")\n# +All+ changes developed should be mentioned in the experiment plan (asana ticket)"
    }
  });
  
 export const getJiraTicket = () => {
    return fakeJiraPayload;
  }


  // fetch(`${URL}/rest/api/2/issue/${TICKET_ID}?fields=description`, {
    //   method: 'GET',
    //   headers: {
    //     'Authorization': `Basic ${Buffer.from(
    //       `${EMAIL}:${JIRA_AUTH_TOKEN}`
    //     ).toString('base64')}`,
    //     'Accept': 'application/json'
    //   }
    // })
    //   .then(response => {
    //     console.log(
    //       `Response: ${response.status} ${response.statusText}`
    //     );
    //     return response.text();
    //   })
    //   .then(text => {
    //     console.log(text)
    //     // const targetDetails = text.split('Targeting details')[1].split("Changes seen")[0];
    //     // const diagnosticGoals = text.split('Diagnostic goals')[1].split("Criteria")[0];
    //     // console.log(targetDetails);
    //     // console.log(diagnosticGoals);
    //   })
    //   .catch(err => console.error(err));