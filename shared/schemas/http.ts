import { z } from 'zod';

export const ErrorDetailsSchema = z.object({
    reason: z.string(),
    message: z.string(),
    code: z.number(),
});

export const SuccessResponseSchema = z.object({
    success: z.literal(true),
    data: z.unknown(),
});

export const ErrorResponseSchema = z.object({
    success: z.literal(false),
    error: ErrorDetailsSchema,
});

export const ResponseSchema = z.discriminatedUnion('success', [SuccessResponseSchema, ErrorResponseSchema]);

export const StreamResponseSchema = z.discriminatedUnion('type', [
    z.object({ type: z.literal('delta'), text: z.string() }),
    z.object({ type: z.literal('done') }),
    z.object({ type: z.literal('error'), message: z.string() }),
]);

export type ErrorDetails = z.infer<typeof ErrorDetailsSchema>;
type SuccessResponseInferred = z.infer<
    typeof SuccessResponseSchema
>;
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
export interface SuccessResponse<T> extends Omit<SuccessResponseInferred, 'data'> {
    data: T
}
export type Response<T> = SuccessResponse<T> | ErrorResponse;
export type StreamResponse = z.infer<typeof StreamResponseSchema>;
export type StreamType = StreamResponse['type'];
export type StreamOf<T extends StreamType> = Extract<StreamResponse, { type: T }>;

