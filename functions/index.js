const functions = require('firebase-functions');
const orderid = require('order-id')('key');
const axios = require('axios').default;
const cors = require('cors')({ origin: true });

// Use a local emulator in development

// async function getOrderData(amount) {

//   var id = orderid.generate();

//   // the requested headers
//   var Headers = {
//     headers: {
//       'Content-Type': 'application/json',
//       'x-client-id': '1100126e5eef8ffc5bbe085ced210011',
//       'x-client-secret': '5f318b2788c96e36c577f45ab9e16d4f4ec63744',
//     },
//   };

exports.getOrderData = functions.https.onCall((data, context) => {
  const amount = data.amount;
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
  return axios
    .post(
      'https://test.cashfree.com/api/v2/cftoken/order',
      {
        orderId: String(id),
        orderAmount: parseFloat(amount),
        orderCurrency: currency,
      },
      config
    )
    .then((response) => {
      return {
        data: response.data,
        id: id,
        amount: amount,
        currency: currency,
      };
    })
    .catch((error) => {
      return error;
    });
});
