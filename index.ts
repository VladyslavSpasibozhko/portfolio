import "dotenv/config";
import Fastify from "fastify";
import multipart from "@fastify/multipart";
import { registerCors } from "./src/plugins/cors.js";
import { registerRateLimit } from "./src/plugins/rateLimit.js";
import { chatRoutes } from "./src/routes/chat.js";
import { createChatRoute } from "./src/routes/createChat.js";
import { deleteChatRoute } from "./src/routes/deleteChat.js";

const app = Fastify({ logger: true });

await registerCors(app);
await registerRateLimit(app);
await app.register(multipart);

await app.register(chatRoutes);
await app.register(createChatRoute);
await app.register(deleteChatRoute);

const port = Number(process.env.PORT);
if (!port) {
  throw new Error("PORT is not set. Copy .env.example to .env and fill it in.");
}

await app.listen({ port, host: "0.0.0.0" });
