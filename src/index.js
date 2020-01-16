#!/usr/bin/env node
import http from "http";
import app from "./app";

app.set("port", 3000);
const server = http.createServer(app);

server.listen(3000);
server.on("error", (error) => { console.error("Error:"); console.error(error); });
server.on("listening", () => { console.log("Listening:"); console.log(JSON.stringify(server.address())); });
