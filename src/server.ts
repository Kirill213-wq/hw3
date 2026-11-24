import "dotenv/config";
import { createApp } from "./app.js";
import { config } from "./config.js";
import { createContainer } from "./container.js";

const container = createContainer();
const app = createApp(container);

const server = app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

function shutdown(signal: string) {
  console.log(`Received ${signal}, shutting down...`);
  server.close(() => {
    process.exit(0);
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
