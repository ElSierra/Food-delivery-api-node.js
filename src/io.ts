import { Server } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from "../interface";
import { collection } from "./app/modules/auth/verifyStreams";
import { ObjectId } from "mongodb";

const io = new Server<ClientToServerEvents, ServerToClientEvents>();

io.on("connection", (socket) => {
  socket.emit("message", "connected");
  console.log(socket.id);

  socket.on("verifyCheck", async (id) => {
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
