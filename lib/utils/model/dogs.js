const pool = require('../pool');
module.exports = class Dog {
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
    static async insert(dog) {
      const { rows } = await pool.query(
        '  INSERT INTO dogs (name, age, weight)VALUES ($1, $2, $3) RETURNING *',
        [dog.name, dog.age, dog.weight]
      );
      return new Dog(rows[0]);
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM dogs WHERE id = $1',
        [id]
      );
      if(!rows[0]) return null;
      else return new Dog(rows[0]);
    }
    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM dogs'

      );
      return rows.map(row => new Dog(row));
    }
    static async update(id, updatedAnimal) {
      const { rows } = await pool.query(
        `UPDATE dogs
            SET name = $1,
            age = $2,
            weight = $3
            WHERE id = $4
            RETURNING *`,
        [updatedAnimal.name, updatedAnimal.age, updatedAnimal.weight, id]
      );
      return new Dog(rows[0]);
    }
    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM dogs WHERE id = $1 RETURNING *',
        [id]
      );
      return new Dog(rows[0]);
    }




};
