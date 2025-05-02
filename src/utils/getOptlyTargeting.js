const optlyPages = {
    5993613683851264: {
      "activation_code": "/**\n * Sample Activation Function\n * For complete documentation, see https://docs.developers.optimizely.com/web/docs/dynamic-websites#section-callback\n * @param {Function} activate - Call this function when you want to activate the page.\n * @param {Object} options - An object containing Page information.\n */\n\nfunction callbackFn(activate, options) {\n  document.querySelector('button').addEventListener('click', activate);\n}",
      "activation_type": "callback",
      "archived": false,
      "category": "other",
      "conditions": "[\"and\", [\"or\", {\"match_type\": \"simple\", \"type\": \"url\", \"value\": \"uk.tommy.com\"}]]",
      "created": "2025-04-16T11:58:13.379599Z",
      "edit_url": "https://uk.tommy.com/men",
      "id": 5993613683851264,
      "key": "14193350179_ab_onboarding_test_page",
      "last_modified": "2025-05-02T08:52:36.636497Z",
      "name": "a/b onboarding test page",
      "project_id": 14193350179
    }
  }

export const getOptlyTargeting = (exp) => {
  
    if (!!exp.page_ids) {
      
      const page_configs = [];
  
      exp.page_ids.forEach(id => {
        
        const page = optlyPages[id];
        page_configs.push(page);
      })
     exp.page_configs = page_configs;
    }
    return exp;
  }


    // page or url targeting
  // page_ids: [Int]
  /*  "activation_code": "/**\n * Sample Activation Function\n * For complete documentation, see https://docs.developers.optimizely.com/web/docs/dynamic-websites#section-callback\n * @param {Function} activate - Call this function when you want to activate the page.\n * @param {Object} options - An object containing Page information.\n function callbackFn(activate, options) {\n  document.querySelector('button').addEventListener('click', activate);}",
    /*"activation_type": "callback",
    "archived": false,
    "category": "other",
    "conditions": "[\"and\", [\"or\", {\"match_type\": \"simple\", \"type\": \"url\", \"value\": \"uk.tommy.com\"}]]",
    "created": "2025-04-16T11:58:13.379599Z",
    "edit_url": "https://uk.tommy.com/men",
    "id": 5993613683851264,
    "key": "14193350179_ab_onboarding_test_page",
    "last_modified": "2025-05-02T08:52:36.636497Z",
    "name": "a/b onboarding test page",
    "project_id": 14193350179 */
  // url_targeting: String
  /*
     "url_targeting": {
     "activation_code": js callback code or polling function (only for "callback" or "polling" activation type)
    "activation_type": "immediate" || "url_changed" || "dom_changed" || "callback" || "manual" || "polling"
    "conditions": urls || js conditions (not callback) || element present ||  "[\"and\", [\"or\", {\"match_type\": \"regex\", \"type\": \"url\", \"value\": \"uk.tommy.com\"}, {\"match_type\": \"simple\", \"type\": \"url\", \"value\": \"646456\"}]]",
    "edit_url": "https://uk.tommy.com/men",
    "key": "14193350179_url_targeting_for_qa__ab_onboarding_test",
    "page_id": 5369359632171008
  }
  */