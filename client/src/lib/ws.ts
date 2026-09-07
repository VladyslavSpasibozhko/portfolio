import type { WsRequestPayload, WsResponsePayload } from '@types';

// function getWsUrl(baseUrl: string = window.location.origin): string {
//   const protocol = baseUrl.startsWith('https') ? 'wss' : 'ws';
//   const host = baseUrl.replace(/^https?:\/\//, '');
//   return `${protocol}://${host}/ws/chat`;
// }

export interface ChatWebSocketOptions {
  url: string;
}

export class ChatWebSocket {
  private ws: WebSocket | null = null;
  private url: string;

  constructor(options: ChatWebSocketOptions) {
    this.url = options.url;
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.url);

        this.ws.onopen = () => {
          resolve();
        };

        this.ws.onerror = () => {
          reject(new Error('WebSocket connection failed'));
        };

        this.ws.onclose = () => {
          this.ws = null;
        };
      } catch (err) {
        reject(err);
      }
    });
  }

  send(payload: WsRequestPayload): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket is not connected');
    }
    this.ws.send(JSON.stringify(payload));
  }

  onmessage(callback: (payload: WsResponsePayload) => void) {
    if (!this.ws) {
      throw new Error('WebSocket is not connected');
    }


    const handler = (event: MessageEvent<'message'>) => {
      try {
        const payload = JSON.parse(event.data);
        callback(payload);
      } catch (err) {
        console.error('Failed to parse WebSocket message:', err);
      }
    };

    this.ws.addEventListener('message', handler)
    return () => this.ws?.removeEventListener('message', handler);
  }

  isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}
