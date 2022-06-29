const ApiError = require('../error/ApiError');
const db = require('../db');

class JsonController {
  async getAll(req, res) {
    let { limit, page } = req.query;

    page = page || 1;
    limit = limit || 10;
    const offset = page * limit - limit;

    const [jsons] = await db.query(
      `SELECT * FROM json LIMIT ${limit} OFFSET ${offset}`
    );

    const query = jsons.map((json) => {
      json.medicine = JSON.stringify(json.medicine);
      json.clinic = JSON.stringify(json.clinic);
      return json;
    });

    const request = await db.query(`SELECT count(id) FROM json`);
    const count = request[0][0].count;

    return res.json({ query, count });
  }
}

module.exports = new JsonController();
