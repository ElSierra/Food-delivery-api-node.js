import * as dotenv from "dotenv";
dotenv.config();
import app from "./app";

const Port = process.env.PORT || 5500;

app.listen(Port, () => {
  console.log("🚀 Server Started @:", Port);
});
