const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const lotRoutes = require('./routes/lotRoutes');

const PORT = 8080;

const app = express();
app.use(cors({
    origin: "https://vaahe.github.io",
    credentials: true
}));

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use('/lot', lotRoutes);

app.listen(PORT, "0.0.0.0", () => console.log(`App started on port ${PORT}`));