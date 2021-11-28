// firebase function

const functions = require('firebase-functions');
const orderid = require('order-id')('key');
const axios = require('axios').default;
const cors = require('cors')({ origin: true });

function getDetails(amount, currency, id, config) {
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
      'x-client-id': '1100126e5eef8ffc5bbe085ced210011',
      'x-client-secret': '5f318b2788c96e36c577f45ab9e16d4f4ec63744',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  };

  return getDetails(amount, currency, id, config);
});
