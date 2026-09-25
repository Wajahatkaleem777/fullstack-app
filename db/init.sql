CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    is_done BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Sample seed data (optional, safe to remove)
INSERT INTO tasks (title, description, is_done)
VALUES
    ('Setup project', 'Initialize backend, frontend, and database', true),
    ('Build REST API', 'Create CRUD endpoints for tasks', false),
    ('Deploy to production', 'Push to server / cloud provider', false)
ON CONFLICT DO NOTHING;
