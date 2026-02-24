const pool = require("../db/db");


//Get all Clients
const clientController = {
    getAllClients: async (req, res) => {
        try {
            const result = await pool.query(
                "SELECT * FROM clients ORDER BY created_at DESC"
            );
            res.json(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Error Fetching Clients" });
        }
    },




    //Create clients
    createClient: async (req, res) => {
        const { name, email, company } = req.body;

        try {
            const result = await pool.query(
                "INSERT INTO CLIENTS (name, email, company) VALUES ($1, $2, $3) RETURNING *",
                [name, email, company]
            );


            const client = result.rows[0];

            await pool.query(
                `INSERT INTO tasks (client_id, title, description, due_date, status)
    VALUES 
    ($2, 'Kickoff Meeting', 'Initial onboarding call', CURRENT_DATE + INTERVAL '3 days', 'Pending'),
    ($3, 'Requirements Gathering', 'Collect project requirements', CURRENT_DATE + INTERVAL '7 days', 'Pending')`,
                [client.id]
            );

            res, json({
                message: "Client created successfully"
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error creating clients" });
        }
    },



    //Update client
    updateClient: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, email, company } = req.body;

            const result = await pool.query(
                "UPDATE clients SET name = COALESCE($1, name), email = COALESCE($2, email), company = COALESCE($3, company) WHERE id = $4 RETURNING *",
                [name, email, company, id]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({ error: "Client not found" });
            }

            res.json({ message: "Client details updated successfully!", client: result.rows[0] });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    },



    //Delete client
    deleteClient: async (req, res) => {
        try {
            const { id } = req.params;
            await pool.query("DELETE FROM clients WHERE id = $1", [id]);
            res.json({ message: "client has been deleted" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Delete failed!" });
        }
    }

    };

    module.exports = clientController;





