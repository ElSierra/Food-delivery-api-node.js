import * as dotenv from "dotenv";
dotenv.config();
import app from "./app";
import io from "./io";




const Port = process.env.PORT || 5500;
const SocketPort = process.env.SOCKET || 3000;

io.listen(Number(SocketPort));



app.listen(Port, () => {
  // console.log('\x1b[34m%s\x1b[0m', `🚀 Server Started @: ${Port}`);
  console.log("🚀 Server Started @:", Port);
});

app.listen(2000,()=>{
  console.log('here')
})