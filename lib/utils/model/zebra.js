const pool = require('../pool');
module.exports = class Zebra {
    id;
    name;
    age;
    weight;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.age = row.age;
      this.weight = row.weight;
    }
    static async insert(zebra) {
      const { rows } = await pool.query(
        '  INSERT INTO zebras (name, age, weight)VALUES ($1, $2, $3) RETURNING *',
        [zebra.name, zebra.age, zebra.weight]
      );
      return new Zebra(rows[0]);
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM zebras WHERE id = $1',
        [id]
      );
      if(!rows[0]) return null;
      else return new Zebra(rows[0]);
    }
    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM zebras'

      );
      return rows.map(row => new Zebra(row));
    }
    static async update(id, updatedAnimal) {
      const { rows } = await pool.query(
        `UPDATE zebras
            SET name = $1,
            age = $2,
            weight = $3
            WHERE id = $4
            RETURNING *`,
        [updatedAnimal.name, updatedAnimal.age, updatedAnimal.weight, id]
      );
      return new Zebra(rows[0]);
    }
    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM zebras WHERE id = $1 RETURNING *',
        [id]
      );
      return new Zebra(rows[0]);
    }




};
