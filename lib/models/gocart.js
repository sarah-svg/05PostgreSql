
const pool = require('../utils/pool');


class Gocart {
  id;
  make;
  model;
  year;

  constructor(row) {
    this.id = String(row.id);
    this.make = row.make;
    this.model = row.model;
    this.year = row.year;

  }

  static async insert({ make, model, year }) {
    const { rows } = await pool.query(
      'INSERT INTO gocarts (make, model, year) VALUES ($1, $2, $3) RETURNING *',
      [make, model, year]
    );
    return new Gocart(rows[0]);
  }
  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM gocarts WHERE id = $1',
      [id]
    );
    if(!rows[0]) throw new Error(`no gocart with id ${id}`);
    return new Gocart(rows[0]);
  }
  static async find() {
    const { rows } = await pool.query('SELECT * FROM gocarts');
    return rows.map(row => new Gocart(row));
  }
  static async update(id, { make, model, year }) {
    const { rows } = await pool.query(
      'UPDATE gocarts SET make=$1, model=$2, year=$3 WHERE id=$4 RETURNING *',
      [make, model, year, id]
    );
    if(!rows[0]) throw new Error(`no cars with id ${id} exists`);
    return new Gocart(rows[0]);

  }
  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM gocarts WHERE id=$1 RETURNING *',
      [id]
    );
    return new Gocart(rows[0]);
  }

}

module.exports = Gocart;

