const db = require('../db');

module.exports = async function (req, res, next) {
  try {
    for (let i = 1; i <= 100000; i++) {
      await db.query(
        `INSERT INTO json VALUES (${i}, '2000-01-01', 1, '1', '{"name": "Askorutin", "form": {"name": "Plate"}, "group": {"name": "Viramins"}, "firm": {"year_of_create": 1950, "country": {"name": "Cuba"},"type_of_property": {"name": "group"}}}', '{"number": 1,"phone": "+38 071 77 77","year_of_create": 2020,"number_of_places": 100,"number_of_doctors": 20, "type": {"name": "Gorodskaya"}, "district": {"name": "Voroshilovskiy"}, "department": {"name": "Laboratory"}}');`
      );
    }
    return res.json({ message: 'Data was generated' });
  } catch (e) {
    console.log(e);
    next(ApiError.internal('Generation was failed'));
  }
};
