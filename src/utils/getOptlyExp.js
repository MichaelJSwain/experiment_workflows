const fakeOptlyPayload = {
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
    "project_id": 14193350179,
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
  };

export const getOptlyExp = (expID) => {
    // "fetch"
    return fakeOptlyPayload;
}