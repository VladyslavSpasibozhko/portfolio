export const ERROR_CODES = {
    BAD_REQUEST: 'bad_request',
    NOT_FOUND: 'not_found',
    PAYLOAD_TOO_LARGE: 'payload_too_large',
    TOO_MANY_REQUESTS: 'too_many_requests',
    SERVER_ERROR: 'server_error',
    NETWORK_ERROR: 'network_error',
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
