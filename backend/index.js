const express = require("express");
const cors = require("cors");
const http = require("http");
const path = require("path")
const socketIo = require("socket.io");
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
const router = require("./routes/router");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

// New connection from the client
io.on("connection", (socket) => {
  console.log("New client connected");

  // Broadcasting an update to a note to all the connected clients
  socket.on("updateNote", (noteId, content) => {
    socket.broadcast.emit("noteUpdated", { noteId, content });
  });

  // Disconnecting
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Serving the static file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

port = process.env.PORT || 5000
server.listen(port, () => {
  console.log("Server Started");
});
