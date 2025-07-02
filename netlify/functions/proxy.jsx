const axios = require("axios");

exports.handler = async function(event) {
  try {
    const path = event.path.replace("/.netlify/functions/proxy", "");
    const url = `http://157.230.240.97:9999/api/v1${path}`;

    const response = await axios({
      method: event.httpMethod,
      url,
      headers: { ...event.headers },
      data: event.body ? JSON.parse(event.body) : undefined,
    });

    return {
      statusCode: response.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
