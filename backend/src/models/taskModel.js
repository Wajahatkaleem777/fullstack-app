const pool = require('../config/db');

const TaskModel = {
  async getAll() {
    const result = await pool.query(
      'SELECT * FROM tasks ORDER BY created_at DESC'
    );
    return result.rows;
  },

  async getById(id) {
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    return result.rows[0];
  },

  async create({ title, description }) {
    const result = await pool.query(
      `INSERT INTO tasks (title, description, is_done)
       VALUES ($1, $2, false)
       RETURNING *`,
      [title, description || null]
    );
    return result.rows[0];
  },

  async update(id, { title, description, is_done }) {
    const result = await pool.query(
      `UPDATE tasks
       SET title = COALESCE($1, title),
           description = COALESCE($2, description),
           is_done = COALESCE($3, is_done),
           updated_at = NOW()
       WHERE id = $4
       RETURNING *`,
      [title, description, is_done, id]
    );
    return result.rows[0];
  },

  async remove(id) {
    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  },
};

module.exports = TaskModel;
