import * as dotenv from "dotenv";
dotenv.config();
import app from "./app";


const Port = process.env.PORT || 5500;

app.listen(Port, () => {
  // console.log('\x1b[34m%s\x1b[0m', `🚀 Server Started @: ${Port}`);
  console.log("🚀 Server Started @:", Port);
});
