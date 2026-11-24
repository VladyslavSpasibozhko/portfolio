import { useEffect, useState } from "react";
import type {
  StatusChangeEvent,
  StatusEmitter,
  StreamStatus,
} from "../utils/statusEmitter";

// TODO: remove;
export function useStreamStatus(statusEmitter: StatusEmitter): StreamStatus {
  const [status, setStatus] = useState(statusEmitter.status);

  useEffect(() => {
    const handleChange = (event: Event) =>
      setStatus((event as StatusChangeEvent).detail);

    statusEmitter.addEventListener("change", handleChange);
    return () => statusEmitter.removeEventListener("change", handleChange);
  }, [statusEmitter]);

  return status;
}
