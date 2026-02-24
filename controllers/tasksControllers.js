const pool = require("../db/db");


const taskController = {

//get all tasks:
getAllTasks:  async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM tasks ORDER BY due_date"
        );

        res.json(result.rows);

    } catch (err) {
        console.error(err);
        res.status().json({ Error: "Error fetching tasks" });
    }
}, 



//get tasks by client id:
getTasksByClient: async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "SELECT * FROM tasks WHERE client_id = $1 ORDER BY due_date", [id]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error fetching tasks" });
    }
},


//create task
createTask: async (req, res) => {
    const { client_id, title, description, due_date } = req.body;

    try {
        const checkClient = await pool.query(
            "SELECT id FROM clients WHERE id = $1 ",
            [client_id]
        );


        // confirm client exists first
        if (checkClient.rows.length === 0) {
            return res.status(400).json({
                error: `client with id ${client_id} does not exist.`
            });
        }


        // now create a task with that client
        const result = await pool.query(
            "INSERT INTO tasks (client_id, title, description, status, due_date) VALUES($1, $2, $3, $4, $5) RETURNING * ",
            [client_id, title, description, 'Pending', due_date]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "server error" })
    }
},


//update task status:
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
            return res.status(400).json({ error: "Task was not Found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Status update failed" });
    }
},



//get overdue tasks:
getOverdueTasks: async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM tasks
       WHERE due_date < CURRENT_DATE
       AND status != 'Completed'`
        );

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error fetching overdue tasks" });
    }
}, 



//delete tasks:
deleteTasks: async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "DELETE FROM tasks WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ Error: "Task not found" })
        }

        res.json({
            message: "Task deleted successfully",
        });


    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: "error deleteing task" });
    }

 }


};

module.exports = taskController;

