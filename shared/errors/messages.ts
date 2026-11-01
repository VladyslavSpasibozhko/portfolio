export const ERROR_MESSAGES = {
    CHAT_REQUEST_INVALID: 'chat.request_invalid',
    MESSAGE_TEXT_TYPE: 'chat.message_text_type',
    SESSION_ID_TEXT_TYPE: 'chat.session_id_text_type',
    CHAT_ID_TEXT_TYPE: 'chat.id_text_type',
    CHAT_ID_NON_EMPTY: 'chat.id_non_empty',
    INVALID_CHAT_REQUEST: 'chat.invalid_request',
    INVALID_GET_CHAT_MESSAGES_PARAMS: 'chat.invalid_get_messages_params',
    INVALID_DELETE_CHAT_PARAMS: 'chat.invalid_delete_params',
    CHAT_NOT_FOUND: 'chat.not_found',

    VALIDATION_FAILED: 'validation.failed',

    REQUEST_UNSUCCESSFUL: 'http.request_unsuccessful',

    UNKNOWN_ERROR: 'common.unknown_error',
} as const;

export type ErrorMessage = (typeof ERROR_MESSAGES)[keyof typeof ERROR_MESSAGES];
