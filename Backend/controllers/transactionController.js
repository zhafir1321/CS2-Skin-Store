const midTransClient = require("midtrans-client");
const { nanoid } = require("nanoid");
const { Transaction } = require("../models/index");

class TransactionController {
  static async initiateMidtransTrx(req, res, next) {
    try {
      const amount = 20_000;

      let snap = new midTransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: "SB-Mid-server-eoNCFlB0ncBUlKw4drDZ9GN6",
      });

      const OrderId = `trx-buy-${nanoid()}`;

      await Transaction.create({
        OrderId,
        BuyerId: req.additionalData.id,
        amount,
      });

      let parameter = {
        "transaction_details": {
          "order_id": OrderId,
          "gross_amount": amount,
        },
        "credit_card": {
          "secure": true,
        },
        "customer_details": {
          "username": req.additionalData.username,
        },
      };

      const transaction = await snap.createTransaction(parameter);
      // transaction token
      let transactionToken = transaction.token;
      res.status(200).json({
        message: "Order Created",
        transactionToken,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async updateOrderStatus(req, res, next) {
    try {
      const { orderId } = req.body;
      // cari order bedasarkan order id
      const order = await Order.findOne({
        where: {
          orderId,
        },
      });

      if (!order) throw { name: "NotFound" };

      // abis itu check midtrans status ordernya
      const base64Key = Buffer.from(process.env.MIDTRANS_SERVER_KEY).toString(
        "base64",
      );
      const { data } = await axios.get(
        `https://api.sandbox.midtrans.com/v2/${orderId}/status`,
        {
          headers: {
            Authorization: `Basic ${base64Key}`,
          },
        },
      );

      if (+data.status_code !== 200) {
        throw { name: "BadRequest" };
      }

      if (data.transaction_status !== "capture") {
        throw { name: "BadRequest" };
      }
      // update order statusnya jadi paid
      await order.update({
        status: "paid",
        paidDate: new Date(),
      });

      res.status(200).json({
        message: "Payment success!",
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = TransactionController;
