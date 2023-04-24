import { Server } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from "../interface";
import { collection } from "./app/modules/auth/verifyStreams";
import { ObjectId } from "mongodb";
import app from "./app";
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// const io = new Server<ClientToServerEvents, ServerToClientEvents>();

io.on("connection", (socket:any) => {
  socket.emit("message", "connected");
  console.log(socket.id);

  socket.on("verifyCheck", async (id:any) => {
    console.log(id);
    try {
      const changeStream = collection.watch([
        {
          $match: {
            "documentKey._id": new ObjectId(id),
          },
        },
      ]);

      changeStream.on("change", (change: any) => {
        //console.log(change.updateDescription.updatedFields.verified)

        if (change.updateDescription?.updatedFields?.verified) {
          //console.log(change); // Change object
          socket.emit("verifyCheck", true);
        }
      });
    } catch (e) {
      console.log(e);
    }
  });
});

export default io;
