const { Server } = require("socket.io");
const UserModel = require("../models/User.model");
const CaptainModel = require("../models/Captain.model");

function initSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // JOIN EVENT
    socket.on("join", async ({ userId, userType }) => {
      console.log("JOIN EVENT RECEIVED:", userId, userType);
      console.log("SOCKET ID:", socket.id);

      try {
        if (userType === "user") {
          const user = await UserModel.findByIdAndUpdate(
            userId,
            { socketId: socket.id },
            { new: true },
          );

          console.log("Updated user:", user);
        }

        if (userType === "captain") {
          const captain = await CaptainModel.findByIdAndUpdate(
            userId,
            { socketId: socket.id, status: "active" },
            { new: true },
          );

          // console.log("Updated captain:", captain);
        }
      } catch (error) {
        console.log("Join error:", error);
      }
    });

    // DRIVER LOCATION UPDATE
    socket.on("update-location", async (captainId, location) => {
      await CaptainModel.findByIdAndUpdate(captainId, {
        location: { ltd: location.ltd, lng: location.lng },
      });
    });

    // USER REQUEST RIDE
    socket.on("request-ride", async (rideData) => {
      const captains = await CaptainModel.find({ status: "active" });

      captains.forEach((captain) => {
        if (captain.socketId) {
          io.to(captain.socketId).emit("new-ride", rideData);
        }
      });
    });

    // DRIVER ACCEPT RIDE
    socket.on("accept-ride", async ({ userId, ride }) => {
      const user = await UserModel.findById(userId);

      if (user?.socketId) {
        io.to(user.socketId).emit("ride-accepted", ride);
      }
    });

    socket.on("disconnect", async () => {
      console.log("Socket disconnected:", socket.id);

      await CaptainModel.findOneAndUpdate(
        { socketId: socket.id },
        {
          socketId: null,
          status: "inactive",
        },
      );

      await UserModel.findOneAndUpdate(
        { socketId: socket.id },
        {
          socketId: null,
        },
      );
    });
  });
}

module.exports = initSocketServer;
