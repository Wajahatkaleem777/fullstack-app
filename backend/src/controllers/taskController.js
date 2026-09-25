const TaskModel = require('../models/taskModel');

const TaskController = {
  async list(req, res, next) {
    try {
      const tasks = await TaskModel.getAll();
      res.json(tasks);
    } catch (err) {
      next(err);
    }
  },

  async getOne(req, res, next) {
    try {
      const task = await TaskModel.getById(req.params.id);
      if (!task) return res.status(404).json({ error: 'Task not found' });
      res.json(task);
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const { title, description } = req.body;
      if (!title || !title.trim()) {
        return res.status(400).json({ error: 'Title is required' });
      }
      const task = await TaskModel.create({ title: title.trim(), description });
      res.status(201).json(task);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const existing = await TaskModel.getById(req.params.id);
      if (!existing) return res.status(404).json({ error: 'Task not found' });

      const { title, description, is_done } = req.body;
      const updated = await TaskModel.update(req.params.id, {
        title,
        description,
        is_done,
      });
      res.json(updated);
    } catch (err) {
      next(err);
    }
  },

  async remove(req, res, next) {
    try {
      const deleted = await TaskModel.remove(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Task not found' });
      res.json({ message: 'Task deleted', task: deleted });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = TaskController;
