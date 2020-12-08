const pool = require('../pool');
module.exports = class Tiger {
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
    static async insert(tiger) {
      const { rows } = await pool.query(
        '  INSERT INTO tigers (name, age, weight)VALUES ($1, $2, $3) RETURNING *',
        [tiger.name, tiger.age, tiger.weight]
      );
      return new Tiger(rows[0]);
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM tigers WHERE id = $1',
        [id]
      );
      if(!rows[0]) return null;
      else return new Tiger(rows[0]);
    }
    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM tigers'

      );
      return rows.map(row => new Tiger(row));
    }
    static async update(id, updatedAnimal) {
      const { rows } = await pool.query(
        `UPDATE tigers
            SET name = $1,
            age = $2,
            weight = $3
            WHERE id = $4
            RETURNING *`,
        [updatedAnimal.name, updatedAnimal.age, updatedAnimal.weight, id]
      );
      return new Tiger(rows[0]);
    }
    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM tigers WHERE id = $1 RETURNING *',
        [id]
      );
      return new Tiger(rows[0]);
    }




};
