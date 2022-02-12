const Film = require('../models/film.model');

exports.getAll = (req, res) => {
  const limit = req.query.limit;
  const page = req.query.page;
  const orderType = req.query.orderType;
  const orderByDesc = req.query.orderByDesc;
  Film.fetchAll(limit, page, orderType, orderByDesc, (err, data) => {
    if (err) {
      const { message } = err;
      res.status(500).send({ message });
    }
    res.send(data);
  });
}