import * as dotenv from "dotenv";
dotenv.config();
import app from "./app/router";
import io from "./app/handlers/socket/io";
import { cronJob } from "./app/modules/misc/cronJob";

const Port = process.env.PORT as string;

io;
cronJob();
app.listen(Port, () => {
  console.log("🚀 Server Started @:", Port);
});
