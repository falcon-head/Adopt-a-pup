// firebase function
const functions = require('firebase-functions');
const orderid = require('order-id')('key');
const axios = require('axios').default;
const cors = require('cors')({ origin: true });
require('dotenv').config();

function getDetails(amount, currency, id, config) {
  // capture the data with axios and return the response
  const promise = axios.post(
    'https://test.cashfree.com/api/v2/cftoken/order',
    {
      orderId: id,
      orderAmount: amount,
      orderCurrency: currency,
    },
    config
  );
  const dataPromise = promise.then(function (res) {
    return {
      data: res.data,
      id: id,
      amount: amount,
      currency: currency,
    };
  });

  return dataPromise;
}

exports.getOrderData = functions.https.onCall((data) => {
  let amount = String(data.amount);
  const currency = 'INR';
  var id = orderid.generate();
  var config = {
    mode: 'no-cors',
    headers: {
      'x-client-id': process.env.X_CLIENT_ID,
      'x-client-secret': process.env.X_CLIENT_SECRET,
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  };

  return getDetails(amount, currency, id, config);
});
