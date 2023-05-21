const getFilteredKeyArray = (keyword) => {
  const localStorageKeys = Object.keys(localStorage);
  const filteredKeys = localStorageKeys.filter((key) =>
    key.startsWith(`${keyword}`)
  );
  return filteredKeys;
};

export default getFilteredKeyArray;
