import * as http from "node:http";
import { sendMail } from "./mail.mjs";
import { formatFile } from "./format_file.mjs";

const PORT = 3000;
const HOSTNAME = "127.0.0.1";
const routes = new Set(["cost", "consultation", "call", "support"]);

const requestEndHandler = async (url, chunks) => {
  const data = JSON.parse(chunks);

  if (data.file) {
    const [fileName, fileContent] = formatFile(data.file);
    data.fileName = fileName;
    data.fileContent = fileContent;
  }

  sendMail(url, data)
}

const server = http.createServer((request, response) => {
  response.setHeader("Content-Type", "text/plain");
  response.setHeader("Access-Control-Allow-Origin", "http://localhost:8000");

  const url = request.url.slice(1);
  if (!routes.has(url)) {
    response.statusCode = 404; 
    response.end("404 Error");
    return;
  }

  let chunks = "";
  request.on("data", (chunk) => chunks += chunk);
  request.on("end", () => requestEndHandler(url, chunks))  

  response.statusCode = 200; 
  response.end("End");
});

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server started at ${HOSTNAME}:${PORT}`)
})