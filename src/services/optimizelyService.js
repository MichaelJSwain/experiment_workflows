const {VITE_TH_PROJECT_ID} = import.meta.env;

const seedTests = [
    {
        "allocation_policy": "manual",
        "audience_conditions": "[\"or\", {\"audience_id\": 4873116552265728}, {\"audience_id\": 6533414275252224}]",
        "campaign_id": 6321976466210816,
        "changes": [],
        "created": "2025-04-16T11:58:27.025285Z",
        "holdback": 0,
        "id": 5576748117524480,
        "is_classic": false,
        "last_modified": "2025-05-02T08:52:39.860439Z",
        "metrics": [],
        "name": "[qa] - A/B onboarding test",
        "page_ids": [
          5993613683851264
        ],
        "project_id": VITE_TH_PROJECT_ID,
        "status": "not_started",
        "traffic_allocation": 10000,
        "type": "a/b",
        "variations": [
          {
            "actions": [],
            "archived": false,
            "name": "Original",
            "status": "active",
            "variation_id": 5600961599635456,
            "weight": 5000
          },
          {
            "actions": [],
            "archived": false,
            "name": "Variation #1",
            "status": "active",
            "variation_id": 6726861506478080,
            "weight": 5000
          }
        ]
      }
];

const seedTargeting = {
    5993613683851264: {
      "activation_code": "/**\n * Sample Activation Function\n * For complete documentation, see https://docs.developers.optimizely.com/web/docs/dynamic-websites#section-callback\n * @param {Function} activate - Call this function when you want to activate the page.\n * @param {Object} options - An object containing Page information.\n */\n\nfunction callbackFn(activate, options) {\n  document.querySelector('button').addEventListener('click', activate);\n}",
      "activation_type": "callback",
      "archived": false,
      "category": "other",
      "conditions": "[\"and\", [\"or\", {\"match_type\": \"simple\", \"type\": \"url\", \"value\": \"uk.tommy.com\"}]]",
      "created": "2025-04-16T11:58:13.379599Z",
      "edit_url": "www.url.com",
      "id": 5993613683851264,
      "key": "14193350179_ab_onboarding_test_page",
      "last_modified": "2025-05-02T08:52:36.636497Z",
      "name": "a/b onboarding test page",
      "project_id": VITE_TH_PROJECT_ID
    }
  };

export const fetchOptlyTests = async () => {
    // "fetch" from Optimizely
    return seedTests;
}

export const fetchOptlyTestConfig = (testID) => {
    // "fetch" single test from Optimizely
    const foundTest = seedTests.find(t => t.id == testID);
    return foundTest;
}

export const fetchOptlyTestTargeting = (test) => {
    // "fetch" the targeting configuration for Optimizely test
    if (!!test.page_ids) {
      
        const page_configs = [];
    
        test.page_ids.forEach(id => {
          
          const page = seedTargeting[id];
          page_configs.push(page);
        })
        test.page_configs = page_configs;
      }
      return test;
}