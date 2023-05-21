const getObjectFromKeys = (...keysArray) => {
  const objectWithFetchedData = keysArray.reduce((accumulator, key) => {
    const rawData = JSON.parse(localStorage.getItem(key));
    const count = rawData.children.length;
    accumulator[key] = {
      id: rawData.id,
      name: rawData.name,
      children: rawData.children,
      count,
    };
    return accumulator;
  }, {});
  return objectWithFetchedData;
};

// Input: ['folder123', 'folder345']
// Output:
// {
//   folder123: {id,name,children,count},
//   folder345: {id,name,children,count},
// }

export { getObjectFromKeys };
