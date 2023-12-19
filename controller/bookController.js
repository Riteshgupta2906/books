const postgre = require("../database");

const bookController = {
  createUser: async (req, res) => {
    const {
      participant_id,
      batch_table_id,
      payment_id,
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
      "INSERT INTO participants(participant_id,firstname,lastname ,email, age ,batch_id ,gender ) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *";
    const date_of_joining = new Date().toUTCString();
    const sql =
      "INSERT INTO payment (payment_id,participant_id, date_of_joining, payment_date) VALUES ($1,$2,$3,$4) RETURNING *";
    const batch =
      "INSERT INTO batches (batch_table_id,participant_id,batch_id) VALUES ($1,$2,$3) RETURNING *";
    try {
      const data = await postgre.query(text, [
        participant_id,
        firstname,
        lastname,
        email,
        newAge,
        batch_id,
        gender,
      ]);
      const data2 = await postgre.query(sql, [
        payment_id,
        participant_id,
        date_of_joining,
        payment_date,
      ]);
      const data3 = await postgre.query(batch, [
        batch_table_id,
        participant_id,
        batch_id,
      ]);
      let newData = data.rows[0];
      newData.date_of_joining = date_of_joining;

      res.json({ msg: "OK", data: newData });
    } catch (error) {
      res.json({ msg: error.msg });
    }
  },

  getAll: async (req, res) => {
    const text =
      "SELECT p.participant_id,p.firstname, p.lastname, p.gender, p.email, p.age, p.batch_id ,py.date_of_joining, py.payment_date FROM participants p JOIN  payment py ON p.participant_id = py.participant_id";

    try {
      const { rows } = await postgre.query(text);
      res.json({ msg: "OK", data: rows });
    } catch (error) {
      res.json({ msg: error.msg });
    }
  },

  getById: async (req, res) => {
    try {
      const sql =
        "SELECT p.participant_id,p.firstname, p.lastname, p.gender, p.email, p.age, p.batch_id ,py.date_of_joining, py.payment_date FROM participants p JOIN  payment py ON p.participant_id = py.participant_id where email=$1";
      const { rows } = await postgre.query(sql, [req.body.email]);

      if (rows[0]) {
        return res.json({ msg: "OK", data: rows });
      }

      res.status(404).json({ msg: "not found" });
    } catch (error) {
      res.json({ msg: error.msg });
    }
  },
  getBatch: async (req, res) => {
    try {
      const sql = "SELECT * from batches where participant_id=$1";
      const { rows } = await postgre.query(sql, [req.body.participant_id]);

      if (rows[0]) {
        return res.json({ msg: "OK", data: rows });
      }

      res.status(404).json({ msg: "not found" });
    } catch (error) {
      res.json({ msg: error.msg });
    }
  },

  updateBatch: async (req, res) => {
    const { participant_id, batch_id, date_of_change } = req.body;
    //console.log(req.body);
    const sql =
      "UPDATE batches SET batch_id=$1,date_of_change=$2 where participant_id=$3 RETURNING *";
    try {
      const data = await postgre.query(sql, [
        batch_id,
        date_of_change,
        participant_id,
      ]);
      res.json({ msg: "OK", data: data.rows[0] });
    } catch (error) {
      res.json({ msg: error.msg });
    }
  },
  updatePay: async (req, res) => {
    const { participant_id, payment_date } = req.body;

    const sql =
      "UPDATE payment SET payment_date=$1 where participant_id=$2 RETURNING *";
    try {
      const data = await postgre.query(sql, [payment_date, participant_id]);

      res.json({ msg: "OK", data: data.rows[0] });
    } catch (error) {
      res.json({ msg: error.msg });
    }
  },
};

module.exports = bookController;
