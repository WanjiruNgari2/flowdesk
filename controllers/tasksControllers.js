const pool = require("../db/db");

const taskController = {
    // Get all tasks
    getAllTasks: async (req, res) => {
        try {
            const query = `
                SELECT t.*,
                       c.name AS client_name,
                       c.email AS client_email,
                       c.company AS client_company
                FROM tasks t
                LEFT JOIN clients c ON t.client_id = c.id
                ORDER BY t.due_date ASC`;

            const result = await pool.query(query);

            const tasks = result.rows.map(task => ({
                ...task,
                client: {
                    id: task.client_id,
                    name: task.client_name,
                    email: task.client_email,
                    company: task.client_company
                }
            }));

            res.json(tasks);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Error fetching tasks" });
        }
    },

    // Get tasks by client ID
    getTasksByClient: async (req, res) => {
        try {
            const { id } = req.params;

            const result = await pool.query(
                "SELECT * FROM tasks WHERE client_id = $1 ORDER BY due_date",
                [id]
            );
            res.json(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Error fetching tasks" });
        }
    },

    // Create a task
    createTasks: async (req, res) => {
        try {
            const { client_id, title, description, due_date } = req.body || {};

            if (!client_id || !title) {
                return res.status(400).json({
                    error: "client_id and title are required"
                });
            }

            const result = await pool.query(
                `INSERT INTO tasks 
                (client_id, title, description, status, due_date) 
                VALUES ($1, $2, $3, $4, $5) 
                RETURNING *`,
                [client_id, title, description, "Pending", due_date]
            );

            res.status(201).json(result.rows[0]);
        } catch (error) {
            console.error("Error creating task:", error);
            res.status(500).json({
                error: "Server error while creating task"
            });
        }
    },

    // Update task status
    updateTaskStatus: async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;

        try {
            let query;
            let params;

            if (status === "Completed") {
                query = `
                    UPDATE tasks
                    SET status = $1, completed_at = CURRENT_TIMESTAMP
                    WHERE id = $2
                    RETURNING *`;
                params = [status, id];
            } else {
                query = `
                    UPDATE tasks
                    SET status = $1, completed_at = NULL
                    WHERE id = $2
                    RETURNING *`;
                params = [status, id];
            }

            const result = await pool.query(query, params);

            if (result.rows.length === 0) {
                return res.status(404).json({ error: "Task not found" });
            }

            res.json(result.rows[0]);
        } catch (err) {
            console.error("Error updating task status:", err);
            res.status(500).json({ error: "Status update failed" });
        }
    },

    // Get overdue tasks
    getOverdueTasks: async (req, res) => {
        try{
            const query = `
                SELECT t.*,
                       c.name AS client_name,
                       c.email AS client_email,
                       c.company AS client_company  
                FROM tasks t
                LEFT JOIN clients c ON t.client_id = c.id
                WHERE t.due_date < CURRENT_DATE AND t.status != 'Completed'
                ORDER BY t.due_date ASC`;

            const result = await pool.query(query);
            const tasks = result.rows.map(task => ({
                ...task,
                client: {   
                    id: task.client_id,
                    name: task.client_name,
                    email: task.client_email,
                    company: task.client_company
                }
            }));

            res.json(tasks);
        } catch(err) {
            console.error("Error fetching overdue tasks:", err);
            res.status(500).json({ error: "Error fetching overdue tasks" });
        }
    },
            

    // Delete a task
    deleteTasks: async (req, res) => {
        try {
            const { id } = req.params;

            const result = await pool.query(
                "DELETE FROM tasks WHERE id = $1 RETURNING *",
                [id]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({ error: "Task not found" });
            }

            res.json({ message: "Task deleted successfully" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Error deleting task" });
        }
    }
};

module.exports = taskController;