const express = require("express");
const compression = require("compression");

const path = require("path");
const app = express();
app.use(compression());

app.use(express.static(path.join(__dirname, "public")));

const port = 3031;

app.listen(port, () => console.log(`app listening on port ${port}!`));
