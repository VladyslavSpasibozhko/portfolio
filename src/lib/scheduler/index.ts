import { Client, Receiver } from "@upstash/qstash";
import { QstashAdapter } from "./qstashAdapter.js";
import type { Scheduler } from "./types.js";

const token = process.env.QSTASH_TOKEN;
const currentSigningKey = process.env.QSTASH_CURRENT_SIGNING_KEY;
const nextSigningKey = process.env.QSTASH_NEXT_SIGNING_KEY;
const baseUrl = process.env.APP_BASE_URL;

if (!token) {
  throw new Error("QSTASH_TOKEN is not set. Copy .env.example to .env and fill it in.");
}

if (!currentSigningKey) {
  throw new Error("QSTASH_CURRENT_SIGNING_KEY is not set. Copy .env.example to .env and fill it in.");
}

if (!nextSigningKey) {
  throw new Error("QSTASH_NEXT_SIGNING_KEY is not set. Copy .env.example to .env and fill it in.");
}

if (!baseUrl) {
  throw new Error("APP_BASE_URL is not set. Copy .env.example to .env and fill it in.");
}

const qstashClient = new Client({ token });
const qstashReceiver = new Receiver({ currentSigningKey, nextSigningKey });

export const scheduler: Scheduler = new QstashAdapter(qstashClient, qstashReceiver, baseUrl.replace(/\/+$/, ""));
export type { Scheduler, ScheduleInput, VerifyInput } from "./types.js";
