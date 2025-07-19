const { createServer } = require("http")
const { Server } = require("socket.io")

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: "https://student-fee-management-1gf1.onrender.com",
    methods: ["GET", "POST"],
  },
})

io.on("connection", (socket) => {
  console.log("User connected:", socket.id)

  socket.on("feeStatusUpdate", (data) => {
    // Broadcast the fee status update to all connected clients
    socket.broadcast.emit("feeStatusUpdated", data)
  })

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id)
  })
})

const PORT = process.env.PORT || 3001
httpServer.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`)
})
