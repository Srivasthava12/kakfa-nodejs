import { IncomingMessage, ServerResponse } from 'http';
import { generateRequestId, REQUEST_ID_HEADER } from './constant';
import { context } from './context';


export function addRequestId(
  req: IncomingMessage,
  res: ServerResponse,
  next: () => void
) {
  let requestId = req.headers[REQUEST_ID_HEADER] as string;

  if (!requestId) {
    requestId = generateRequestId();
    req.headers[REQUEST_ID_HEADER] = requestId;
  }

  res.setHeader(REQUEST_ID_HEADER, requestId);

  const currentContext = context().getStore();

  if (currentContext) {
    // Append to the current context
    currentContext.requestId = requestId;
    next();
    return;
  }

  context().run({ requestId }, next);
}
