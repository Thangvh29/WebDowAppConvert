const express = require('express');
const router = express.Router();
const axios = require('axios');
const crypto = require('crypto');

router.post('/momo', async (req, res) => {
  try {
    const { productId, productName, amount } = req.body;

    const partnerCode = process.env.MOMO_PARTNER_CODE;
    const accessKey = process.env.MOMO_ACCESS_KEY;
    const secretKey = process.env.MOMO_SECRET_KEY;
    const notifyUrl = process.env.MOMO_NOTIFY_URL;
    const endpoint = process.env.MOMO_ENDPOINT;
    const requestType = 'captureWallet';

    const orderId = `${productId}_${Date.now()}`;
    const requestId = `req_${Date.now()}`;

    // redirect về trang download-success kèm product
    const returnUrl = `${process.env.FRONTEND_URL}/download-success?product=${productId}`;

    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=&ipnUrl=${notifyUrl}&orderId=${orderId}&orderInfo=${productName}&partnerCode=${partnerCode}&redirectUrl=${returnUrl}&requestId=${requestId}&requestType=${requestType}`;

    const signature = crypto.createHmac('sha256', secretKey)
                            .update(rawSignature)
                            .digest('hex');

    const requestBody = {
      partnerCode,
      accessKey,
      requestId,
      amount: String(amount),
      orderId,
      orderInfo: productName,
      redirectUrl: returnUrl,
      ipnUrl: notifyUrl,
      extraData: '',
      requestType,
      signature,
      lang: 'vi'
    };

    const momoRes = await axios.post(endpoint, requestBody, {
      headers: { 'Content-Type': 'application/json' }
    });

    if (momoRes.data?.payUrl) {
      return res.json({ payUrl: momoRes.data.payUrl });
    } else {
      return res.status(500).json({ error: 'Không nhận được payUrl từ MoMo', raw: momoRes.data });
    }
  } catch (err) {
    console.error('MoMo error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
