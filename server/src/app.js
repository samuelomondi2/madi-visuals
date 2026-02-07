require("./config");

const express = require("express");
const cookieParser = require("cookie-parser");
// const cors = require('cors');

const cors = require("./config/cors");
const sessions = require("./config/sessions");
const routes = require("./routes");
// Destructure both the protection AND the generator
const csrfMiddleware = require('./middleware/csrf.middleware');
const errorMiddleware = require("./middleware/error.middleware");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors); // Ensure this is called as a function: cors()
app.use(sessions);

// 1. Log incoming requests (Great for debugging 2026 hangs)
app.use((req, res, next) => {
    console.log(`Incoming: ${req.method} ${req.url}`);
    next();
});

app.use(csrfMiddleware);

app.use("/api", routes);

app.use(errorMiddleware);

module.exports = app;
