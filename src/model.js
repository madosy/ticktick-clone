// import my json data file into memory
import sampleData from "./sampleData.json";
import nestedSampleData from "./sampleData-nested.json";
import { View as ViewModule } from "./view";

let View = new ViewModule();

// SELECT, INSERT, UPDATE, DELETE functions defined and exported.
console.log("I'm called from model.js");

// Get only folder items
console.log(...sampleData.sort());
// console.log(...nestedSampleData[0].items[0].items[0]);

// let nestedItem = nestedSampleData[0].items[0].items[0];
// console.log(View.addTodoItem(nestedItem));
