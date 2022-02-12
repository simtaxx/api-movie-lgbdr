const mariaDb = require('./db');

exports.fetchAll = (limit, page, orderType, orderByDesc, result) => {
  const orderTypes = {
    1: 'film.title',
    2: 'pay.amount',
    3: 'rating',
    4: 'cat.name',
    5: 'rentNb',
  }
  let query = `
    SELECT title, rating, cat.name, COUNT(rent.rental_id) AS rentNb, pay.amount
    FROM film
    INNER JOIN film_category AS film_cat ON film.film_id = film_cat.film_id
    INNER JOIN category AS cat ON film_cat.category_id = cat.category_id
    INNER JOIN inventory AS inv ON film.film_id = inv.film_id
    INNER JOIN rental AS rent ON inv.inventory_id = rent.inventory_id
    INNER JOIN payment AS pay ON rent.rental_id = pay.rental_id
    GROUP BY film.title
    ORDER BY ${!orderTypes[orderType] ? 'film.title' : orderTypes[orderType]} ${Number(orderByDesc) === 1 ? 'DESC' : 'ASC'}
    LIMIT ${limit}
    OFFSET ${(page - 1) * limit};
  `;
  const data = {};
  mariaDb.query(query, (err, res) => {
    if (err) throw err;
    data.films = res;
  });

  let queryNbPages = `
    SELECT COUNT(film_id) as nbFilm
    FROM film
  `
  mariaDb.query(queryNbPages, (err, res) => {
    if (err) throw err;
    data.nbPages = res[0].nbFilm / limit;
    result(null, data);
  });
}