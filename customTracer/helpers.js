const axios = require("axios");

const uniqueId = () => {
  const digits = "0123456789abcdef";
  let n = "";
  for (let i = 0; i < 16; i++) {
    const rand = Math.floor(Math.random() * 16);
    n += digits[rand];
  }
  return n;
};

const getTimeStamp = () => {
  return Number(`${Date.now()}000`);
};

const createTracingRequestBody = (config, queue) => {
  return queue.map(span => {
    return {
      ...span
    };
  });
};

const sendTrace = (config, queue) => {
  const requestBody = createTracingRequestBody(config, queue);
  return axios.post(config.url, requestBody);
};
module.exports = {
  sendTrace,
  getTimeStamp,
  uniqueId
};
