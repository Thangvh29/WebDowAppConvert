const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const querystring = require('querystring');

router.post('/vnpay', (req, res) => {
  try {
    const { productId, productName, amount } = req.body;

    const tmnCode = process.env.VNPAY_TMN_CODE;
    const secretKey = process.env.VNPAY_HASH_SECRET;
    const vnpUrl = process.env.VNPAY_API_URL;

    const createDate = new Date().toISOString().replace(/-|:|\.\d+/g, '').slice(0, 14);
    const orderId = `${productId}_${Date.now()}`;
    const txnRef = orderId;

    const returnUrl = `${process.env.FRONTEND_URL}/download-success?product=${productId}`;

    const vnpParams = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: tmnCode,
      vnp_Amount: amount * 100,
      vnp_CurrCode: 'VND',
      vnp_TxnRef: txnRef,
      vnp_OrderInfo: productName,
      vnp_OrderType: 'other',
      vnp_Locale: 'vi',
      vnp_ReturnUrl: returnUrl,
      vnp_CreateDate: createDate
    };

    const sorted = {};
    Object.keys(vnpParams).sort().forEach(key => { sorted[key] = vnpParams[key]; });

    const signData = querystring.stringify(sorted, { encode: false });
    const hmac = crypto.createHmac('sha512', secretKey).update(signData).digest('hex');

    const query = querystring.stringify({ ...sorted, vnp_SecureHash: hmac }, { encode: true });
    const payUrl = `${vnpUrl}?${query}`;

    res.json({ payUrl });
  } catch (err) {
    console.error('VNPAY error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
