"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({
    port: 8000
});
let usercount = 0;
let allSocket = [];
wss.on("connection", (socket) => {
    // allSocket.push(socket)
    // usercount ++ ;
    // console.log("Usercount ::" + usercount)
    // // setInterval(() => {
    // //     socket.send("Hello User " + usercount)
    // // }, 1)
    // socket.on("close" , (s : any)=> {
    //     console.log(s)
    //     allSocket  = allSocket.filter(x => x != socket )    
    //     console.log(allSocket.length)
    // })
    // socket.on("message" ,(ev)=>{
    //     if(ev.toString() === "lawda"){
    //         allSocket.forEach((socket) => {
    //             socket.send("Hello Lawda")
    //         })
    //     }
    //     allSocket.forEach((socket) => {
    //         socket.send(ev.toString())
    //     })
    // })
    socket.on("message", (message) => {
        var _a;
        const parsedMessage = JSON.parse(message);
        console.log(parsedMessage);
        if (parsedMessage.type === "join") {
            console.log("Before ::" + allSocket);
            allSocket.push({
                socket: socket,
                room: parsedMessage.payload.roomId
            });
            console.log("After ::" + allSocket);
        }
        if (parsedMessage.type === "chat") {
            const currentuserRoom = (_a = allSocket.find((x) => {
                return x.socket === socket;
            })) === null || _a === void 0 ? void 0 : _a.room;
            console.log("Current room is ::" + currentuserRoom);
            allSocket.forEach((user) => {
                console.log(user);
                if (user.room === currentuserRoom) {
                    user.socket.send(JSON.stringify({
                        type: "chat",
                        payload: {
                            message: parsedMessage.payload.message,
                        }
                    }));
                }
            });
        }
    });
    socket.on("disconnect", () => {
        console.log("user disconnected" + socket);
    });
});
