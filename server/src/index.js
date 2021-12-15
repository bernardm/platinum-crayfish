require('dotenv/config');
const port = process.env.PORT;

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const api = require("./api");
app.use("/api/v1/", api);

app.delete('/server', function (req, res) {
  setTimeout(function () {
    server.close();
  }, 500);
  console.log('Shutting down server.');
  return res.send('Shutting down server.');
});

const server = app.listen(port, () => console.log(`Server listening on http://localhost:${port}/`));
