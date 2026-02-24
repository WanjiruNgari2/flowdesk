const express = require ("express");
const app = express();

const routes = require ("../routes");

// routes to begin with 'api' 

app.use(express.json());

app.get("/", (req,res) => {
    console.log("Project currently running!");
});


app.use("/api", routes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log("Server running on port 3000");

});