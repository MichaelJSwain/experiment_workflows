import { optlyPostReqBody } from "../data/optlyPostReqBody";
import { seedTargeting, seedTests } from "../data/seedData";
const {VITE_OPTLY_AUTH_TOKEN, VITE_OPTLY_EXP_ID} = import.meta.env;

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

export const updateOptlyTestStatus = (status) => {
  
  const reqBody = JSON.stringify({...optlyPostReqBody});

  const action = status === "running" ? "start" : "pause";
  
  const options = {
    method: 'PATCH',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: VITE_OPTLY_AUTH_TOKEN
    },
    body: reqBody
  };
  
  fetch(`https://api.optimizely.com/v2/experiments/${VITE_OPTLY_EXP_ID}?action=${action}`, options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err));
}