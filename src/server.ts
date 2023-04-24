import * as dotenv from "dotenv";
dotenv.config();
import app from "./app";
import io from "./io";

const Port = process.env.PORT || 5500;

io;

app.listen(Port, () => {
  console.log("🚀 Server Started @:", Port);
});
