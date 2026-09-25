export type StreamStatus = "idle" | "waiting" | "generating" | "generated" | "failed";

export type StatusChangeEvent = CustomEvent<StreamStatus>;

export class StatusEmitter extends EventTarget {
  private current: StreamStatus;

  constructor(initial: StreamStatus) {
    super();
    this.current = initial;
  }

  get status(): StreamStatus {
    return this.current;
  }

  set(status: StreamStatus): void {
    this.current = status;
    this.dispatchEvent(new CustomEvent("change", { detail: status }));
  }
}
