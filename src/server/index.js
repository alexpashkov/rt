require("dotenv").config();

const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
