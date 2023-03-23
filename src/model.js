// import my json data file into memory
import sampleData from "./sampleData.json";

// SELECT, INSERT, UPDATE, DELETE functions defined and exported.
console.log("I'm called from model.js");

// Get only folder items
console.log(sampleData.filter((obj) => obj.type == "folder"));
