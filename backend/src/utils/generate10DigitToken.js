// utils/generate10DigitToken.js
const generate10DigitToken = () => {
  let token = "";
  for (let i = 0; i < 10; i++) {
    token += Math.floor(Math.random() * 10);
  }
  return token;
};

module.exports = { generate10DigitToken };
