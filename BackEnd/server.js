const http = require("http");
const app = require("./app");
const { db, sql } = require("@vercel/postgres");

require("dotenv").config();

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
