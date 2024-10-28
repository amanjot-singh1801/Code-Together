const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const cors = require('cors');
const { Server } = require('socket.io');
const ACTIONS = require("../src/Actions");
const database = require("./config/database");
const userRoute = require("./routes/auth");
const projectRouter = require('./routes/project');
const { auth } = require('./Middlewares/auth');
const cookieParser = require("cookie-parser");
const deleteRouter = require('./routes/deleteproject');


const server = http.createServer(app);

// const io = new Server(server);
// app.use(express.static('build'));
// app.use((req, res, next) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
app.use(cors());
app.use(cookieParser());
const io = new Server(server, {
    cors: {
        origin: "*", // Allow React client
        credentials: true,
    }
})
app.use(express.json());
app.use("/auth",userRoute);
app.use("/project",auth,projectRouter);
app.use("/delete",auth,deleteRouter);
database.connect();


const userSocketMap = {};
function getAllConnectedClients(roomId) {
    // Map
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
        (socketId) => {
            return {
                socketId,
                username: userSocketMap[socketId],
            };
        }
    );

    // return io.sockets.adapter.rooms.get(roomId);
}


io.on('connection', (socket) => {
    console.log('socket connected', socket.id);

    socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
        userSocketMap[socket.id] = username;
        socket.join(roomId);
        const clients = getAllConnectedClients(roomId);
        clients.forEach(({ socketId }) => {
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                username,
                socketId: socket.id,
            });
        });
    });

    socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
        socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
    });

    socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
        io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
    });

    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
            socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                username: userSocketMap[socket.id],
            });
        });
        delete userSocketMap[socket.id];
        socket.leave();
    });
});

const PORT = process.env.PORT || 5500;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
