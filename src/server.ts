import * as dotenv from "dotenv";
dotenv.config();
import app from "./app/router";
import io from "./app/handlers/socket/io";

const Port = process.env.PORT as string;

io;

app.listen(Port, () => {
  console.log("🚀 Server Started @:", Port);
});
