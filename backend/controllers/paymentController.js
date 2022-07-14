const asyncHandler = require("express-async-handler");
const Order = require("../model/orderModel");
const PaytmChecksum = require("paytmchecksum");
const { uuid } = require("uuidv4");

//@desc Add Payment
//@route POST /api/payment
//@access Private
const addPayment = asyncHandler(async (req, res) => {
  const { amount, email } = req.body;
  // res.json({amount:amount, email:email})
  var params = {};
  const totalAmount = JSON.stringify(amount);
  /* initialize an array */
  params["MID"] = process.env.PAYTM_MID;
  params["WEBSITE"] = process.env.PAYTM_WEBSITE;
  params["CHANNEL_ID"] = process.env.PAYTM_CHANNEL_ID;
  params["INDUSTRY_TYPE"] = process.env.PAYTM_INDUSTRY_TYPE;
  params["ORDER_ID"] = req.params.id;
  //   params["CUST_ID"] =
  params["TXN_AMOUNT"] = totalAmount;
  params["CALLBACK_URL"] = "https://localhost:5000/api/v1/public/callback";
  params["EMAIL"] = email;
  params["MOBILE_NO"] = "9726008890";
  // res.send(params);
  /**
   * Generate checksum by parameters we have
   * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
   */

  var paytmChecksum = PaytmChecksum.generateSignature(
    params,
    process.env.PAYTM_MK
  );

  paytmChecksum
    .then(function (checksum) {
      let paytmParams = { ...params, CHECKSUMHASH: checksum };
      res.json(paytmParams);
    })
    .catch(function (error) {
      throw new Error(error);
    });
});

module.exports = { addPayment };
