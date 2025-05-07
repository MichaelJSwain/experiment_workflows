import { seedTargeting, seedTests } from "../data/seedData";

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