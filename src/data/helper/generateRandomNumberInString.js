const generateRandomNumberInString = () => {
  const max = 99;
  const randomInt = Math.floor(Math.random() * max);
  return `${Date.now()}${randomInt}`;
};

export { generateRandomNumberInString };
