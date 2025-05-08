const {VITE_TEAMS_CHANNEL_ENDPOINT} = import.meta.env;
import axios from "axios";

export const postTeamsUpdate = (testId, status) => {
    console.log("posting update to teams => ", testId, status);
    let message = [
        {
        type: "Container",
        items: [
            {
                type: "TextBlock",
                text: "Optimizely client-side updates",
                weight: "bolder",
                size: "Large"
            },
            {
                type: "TextBlock",
                text: `${status === "running" ? "Test launched" : "Test paused"}`,
                weight: "bolder",
                size: "small"
              },
              {
                type: "TextBlock",
                text: `${testId}`,
                weight: "bolder",
                size: "small"
              },
              {
                'type': 'TextBlock',
                'text': ' ',
                'separator': true,
                'isSubtle': true,
                'size': 'small'
            }
        ]
        },  

        ];
    
        const reqbody = {
            "type":"message",
            "attachments":[
               {
                  "contentType":"application/vnd.microsoft.card.adaptive",
                  "contentUrl":null,
                  "content":{
                     "$schema":"http://adaptivecards.io/schemas/adaptive-card.json",
                     "type":"AdaptiveCard",
                     "version":"1.4",
                     "body": message
                     
                  }
               }
            ]
         };
         axios.post(`${VITE_TEAMS_CHANNEL_ENDPOINT}`, reqbody)
        .then(function (response) {
            console.log(`✅ Notification successfully sent`);
        })
        .catch(function (error) {
            console.log(`⚠️ Unable to send notification: ${error.message}`);
        });
    
}
  
