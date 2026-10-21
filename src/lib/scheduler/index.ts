import { Client, Receiver } from "@upstash/qstash";
import { config } from "../../config/index.js";
import { QstashAdapter } from "./qstashAdapter.js";
import type { Scheduler } from "./types.js";

const qstashClient = new Client({ token: config.qstashToken });
const qstashReceiver = new Receiver({
  currentSigningKey: config.qstashCurrentSigningKey,
  nextSigningKey: config.qstashNextSigningKey,
});

export const scheduler: Scheduler = new QstashAdapter(qstashClient, qstashReceiver, config.serverUrl.replace(/\/+$/, ""));
export type { Scheduler, ScheduleInput, VerifyInput } from "./types.js";
