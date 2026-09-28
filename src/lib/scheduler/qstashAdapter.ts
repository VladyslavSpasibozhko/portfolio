import type { Client, Receiver } from "@upstash/qstash";
import type { ScheduleInput, Scheduler, VerifyInput } from "./types.js";

export class QstashAdapter implements Scheduler {
  constructor(
    private readonly client: Client,
    private readonly receiver: Receiver,
    private readonly baseUrl: string,
  ) {}

  async schedule({ path, delaySeconds }: ScheduleInput): Promise<void> {
    await this.client.publishJSON({ url: this.url(path), delay: delaySeconds });
  }

  async verify({ signature, body, path }: VerifyInput): Promise<boolean> {
    try {
      return await this.receiver.verify({ signature, body, url: this.url(path) });
    } catch {
      return false;
    }
  }

  private url(path: string): string {
    return this.baseUrl + path;
  }
}
