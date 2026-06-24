import { createServer } from "node:http";
import next from "next";

const port = Number(process.env.PORT || 3000);
const hostname = process.env.HOST || "0.0.0.0";
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

process.on("uncaughtException", (error) => {
  console.error("UNCAUGHT_EXCEPTION", error);
});

process.on("unhandledRejection", (error) => {
  console.error("UNHANDLED_REJECTION", error);
});

await app.prepare();

const server = createServer((req, res) => {
  handle(req, res);
});

server.on("error", (error) => {
  console.error("SERVER_ERROR", error);
});

server.on("close", () => {
  console.error("SERVER_CLOSE");
});

server.listen(port, hostname, () => {
  console.log(`GPI W website running at http://${hostname}:${port}`);
});

process.on("SIGTERM", () => {
  server.close(() => process.exit(0));
});
