export interface ScheduleInput {
  path: string;
  delaySeconds: number;
}

export interface VerifyInput {
  signature: string;
  body: string;
  path: string;
}

export interface Scheduler {
  schedule(input: ScheduleInput): Promise<void>;
  verify(input: VerifyInput): Promise<boolean>;
}
