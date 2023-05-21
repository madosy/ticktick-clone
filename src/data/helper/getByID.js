const getByID = (id) => {
  const rawData = localStorage.getItem(id);
  const parsedData = JSON.parse(rawData);
  return parsedData;
};

export default getByID;
