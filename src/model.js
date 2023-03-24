// import my json data file into memory
import data from "./sampleData.json";
import nestedSampleData from "./sampleData-nested.json";

function getIndexByID(id) {
  const id_list = data.map((item) => item.id);
  return id_list.indexOf(id);
}

function getIndexByProperty(property, value) {
  const propertyList = data.map((item) => item[property]);
  const indList = propertyList.reduce((acc, currentVal, ind) => {
    if (currentVal == value) acc.push(ind);
    return acc;
  }, []);
  return indList;
}

let getData = function (id = "none") {
  if (id == "none") return [...data];
  else {
    const ind = getIndex(id);
    return data[ind];
  }
};

let getPanelList = function (id = 0) {
  let parentInd = getIndexByID(id);
  let parentObj = data[parentInd];
  let childrenInd = parentObj.ordered_children_id;

  const childrenObj = childrenInd.reduce((acc, cv) => {
    const childObjInd = getIndexByID(cv);
    const childObj = data[childObjInd];
    acc.push(childObj);
    return acc;
  }, []);

  return childrenObj;
};

export { getData, getPanelList };
