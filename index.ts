import "dotenv/config";
import Fastify from "fastify";
import multipart from "@fastify/multipart";
import { config } from "./src/config/index.js";
import { registerCors } from "./src/plugins/cors.js";
import { registerRateLimit } from "./src/plugins/rateLimit.js";
import { chatRoutes } from "./src/routes/chat.js";
import { createChatRoute } from "./src/routes/createChat.js";
import { cleanupChatRoute } from "./src/routes/cleanupChat.js";
import { deleteChatRoute } from "./src/routes/deleteChat.js";
import { getChatMessagesRoute } from "./src/routes/getChatMessages.js";
import { flags } from "./src/routes/flags.js";

const app = Fastify({ logger: true });

await registerCors(app);
await registerRateLimit(app);
await app.register(multipart);

await app.register(chatRoutes);
await app.register(createChatRoute);
await app.register(deleteChatRoute);
await app.register(getChatMessagesRoute);
await app.register(cleanupChatRoute);
await app.register(flags);

await app.listen({ port: config.port, host: "0.0.0.0" });
