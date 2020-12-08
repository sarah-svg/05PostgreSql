const pool = require('../pool');
module.exports = class Elephant {
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
    static async insert(elephant) {
      const { rows } = await pool.query(
        '  INSERT INTO elephants (name, age, weight)VALUES ($1, $2, $3) RETURNING *',
        [elephant.name, elephant.age, elephant.weight]
      );
      return new Elephant(rows[0]);
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM elephants WHERE id = $1',
        [id]
      );
      if(!rows[0]) return null;
      else return new Elephant(rows[0]);
    }
    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM elephants'

      );
      return rows.map(row => new Elephant(row));
    }
    static async update(id, updatedAnimal) {
      const { rows } = await pool.query(
        `UPDATE elephants
            SET name = $1,
            age = $2,
            weight = $3
            WHERE id = $4
            RETURNING *`,
        [updatedAnimal.name, updatedAnimal.age, updatedAnimal.weight, id]
      );
      return new Elephant(rows[0]);
    }
    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM elephants WHERE id = $1 RETURNING *',
        [id]
      );
      return new Elephant(rows[0]);
    }




};
