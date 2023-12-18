const postgre = require("../database");

const bookController = {
  createUser: async (req, res) => {
    const {
      participant_id,
      firstname,
      lastname,
      email,
      age,
      batch_id,
      gender,
    } = req.body;

    const payment_date = null;
    const newAge = Number(age);
    const text =
      "INSERT INTO participants(participant_id,firstname,lastname ,email, age ,batch_id ,payment_date,gender ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *";

    try {
      const data = await postgre.query(text, [
        participant_id,
        firstname,
        lastname,
        email,
        newAge,
        batch_id,
        payment_date,
        gender,
      ]);
      res.json({ msg: "OK", data: data.rows[0] });
    } catch (error) {
      res.json({ msg: error.msg });
    }
  },

  getAll: async (req, res) => {
    try {
      const { rows } = await postgre.query("select * from participants");
      res.json({ msg: "OK", data: rows });
    } catch (error) {
      res.json({ msg: error.msg });
    }
  },

  getById: async (req, res) => {
    try {
      const { rows } = await postgre.query(
        "select * from participants where  email=$1",
        [req.body.email]
      );

      if (rows[0]) {
        return res.json({ msg: "OK", data: rows });
      }

      res.status(404).json({ msg: "not found" });
    } catch (error) {
      res.json({ msg: error.msg });
    }
  },
  updateBatch: async (req, res) => {
    const { participant_id, batch_id } = req.body;

    const sql =
      "UPDATE participants SET batch_id=$1 where participant_id=$2 RETURNING *";
    try {
      const data = await postgre.query(sql, [batch_id, participant_id]);
      res.json({ msg: "OK", data: data.rows[0] });
    } catch (error) {
      res.json({ msg: error.msg });
    }
  },
  updatePay: async (req, res) => {
    const { participant_id, payment_date } = req.body;
    const sql =
      "UPDATE participants SET payment_date=$1 where participant_id=$2 RETURNING *";
    try {
      const data = await postgre.query(sql, [payment_date, participant_id]);

      res.json({ msg: "OK", data: data.rows[0] });
    } catch (error) {
      res.json({ msg: error.msg });
    }
  },
};

module.exports = bookController;
