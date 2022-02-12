const mariaDb = require('./db');

exports.fetchAll = async (limit, page, orderType, orderByDesc, result) => {
  const orderTypes = {
    1: 'film.title',
    2: 'pay.amount',
    3: 'rating',
    4: 'cat.name',
    5: 'rentNb',
  }
  const data = {};
  let nbFilms = 0;

  try {
    let queryNbFilms = `
      SELECT COUNT(film_id) as nbFilms
      FROM film
    `;
    const nbFilmsDb = await mariaDb.query(queryNbFilms);
    nbFilms = nbFilmsDb[0].nbFilms
    data.nbPages = nbFilmsDb[0].nbFilms / (Number(limit) === 0 ? 1 : limit);

    let query = `
      SELECT title, rating, cat.name AS category, COUNT(rent.rental_id) AS rentNb, pay.amount
      FROM film
      LEFT JOIN film_category AS film_cat ON film.film_id = film_cat.film_id
      LEFT JOIN category AS cat ON film_cat.category_id = cat.category_id
      LEFT JOIN inventory AS inv ON film.film_id = inv.film_id
      LEFT JOIN rental AS rent ON inv.inventory_id = rent.inventory_id
      LEFT JOIN payment AS pay ON rent.rental_id = pay.rental_id
      GROUP BY film.title
      ORDER BY ${!orderTypes[orderType] ? 'film.title' : orderTypes[orderType]} ${Number(orderByDesc) === 1 ? 'DESC' : 'ASC'}
      ${limit > 0 ? `LIMIT ${limit}` : `LIMIT ${nbFilms}`}
      OFFSET ${(page - 1) * limit};
    `;
    const films = await mariaDb.query(query);
    data.films = films;

    result(null, data);
  } catch (error) {
    throw error;
  }
}
