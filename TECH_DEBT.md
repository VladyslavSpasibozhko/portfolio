# Tech Debt

## Validation Error Messages

**Priority:** Medium

**Reason:**  
Validation failures return AJV's technical error messages ("must be string", "must have required property") instead of user-friendly messages. Users can't understand what went wrong with their input.

**What to update:**
Define custom error mappings in `ErrorsDictionary` for common validation failures in WebSocket messages.

**How:**
1. Identify exact error paths AJV generates for missing/invalid fields
2. Map those paths to user-friendly messages
3. Pass `ErrorsDictionary` to `validate()` function
4. Test that error messages are helpful and accurate

## AI Response Format Is an Untyped String

**Priority:** Medium

**Reason:**  
`AIAdapter.sendMessage` and `services/ai.ts` `chat()` both return a plain `string`, with no indication of whether it's Markdown or plain text. The client can't reliably decide how to render it (e.g. run it through a Markdown renderer vs. display as-is).

**What to update:**
Narrow and type the AI response shape so the format is explicit and part of the contract (e.g. `{ format: 'markdown' | 'text'; content: string }`), threaded through the lib, service, and `WsMessage`/`WsSuccessResponse` types.

**How:**
1. Decide the response format(s) the assistant should support
2. Update `AIAdapter` contract and `Message`/`WsMessage` types to carry the format alongside the content
3. Update the client to render based on the declared format

## AI Should Accept Files as Context

**Priority:** Low

**Reason:**  
There's currently no way to pass files (e.g. attachments, documents) into the AI's context — only the static `profile.md` and the chat history are used. `@fastify/multipart` is already registered but unused for this purpose.

**What to update:**
Design and implement a way for the chat flow to accept file input and incorporate it into the AI context.

**How:**
To be discussed — needs a decision on transport (WS message vs. HTTP upload endpoint), file types supported, and how file content is merged into the system prompt/context.

## Optimize Images Delivery

**Priority:** Medium

**Reason:**  
Images are served without optimization (compression, formats, sizes). This impacts page load times, bandwidth usage, and user experience, especially on mobile or slower connections.

**What to update:**
Implement image optimization across the portfolio, including responsive images, modern formats (WebP), and lazy loading.

**How:**
1. Audit all images in the portfolio to identify optimization opportunities
2. Consider using image optimization tools/services (e.g. sharp, ImageOptim, or CDN with built-in optimization)
3. Implement responsive images with srcset for different screen sizes
4. Add lazy loading where appropriate (Intersection Observer or native `loading="lazy"`)
5. Convert to modern formats (WebP with fallbacks) where possible
6. Measure performance impact (LCP, CLS) before and after
