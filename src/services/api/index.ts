import { NextApiRequest, NextApiResponse } from 'next';
import { getUserFromJwt } from '../../businessLogics/users';
import { TestError, UnauthorizedError } from '../../errors';
import { User } from '../../types';
import { validateAuthorizationHeader } from '../validation';

type AuthenticatedRequest = NextApiRequest & { user: User };
type DefaultRouteHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void>;
type PrivateRouteHandler = (
  req: AuthenticatedRequest,
  res: NextApiResponse,
) => Promise<void>;

export function routeHandler(handlers: {
  [k in string]?: DefaultRouteHandler;
}): DefaultRouteHandler {
  return async (req, res) => {
    try {
      const defaultHandler: DefaultRouteHandler = async (_, r) =>
        r.status(404).json({ message: 'Not Found' });
      const method = req.method?.toLowerCase() ?? 'get';
      const handler = handlers[method] ?? defaultHandler;
      return await handler(req, res);
    } catch (error) {
      console.error(error);
      if (error instanceof TestError) {
        const { status, body } = error.toApiResponse();
        return res.status(status).json({ error: body });
      }
      const message =
        error instanceof Error ? error.toString() : 'Internal Server Error';
      return res.status(500).json({ error: { message } });
    }
  };
}

export function privateRouteHandler(
  fn: PrivateRouteHandler,
): DefaultRouteHandler {
  return async (req, res) => {
    const { authorization } = req.headers;
    let str = '';
    try {
      str = validateAuthorizationHeader(authorization);
    } catch (error) {
      console.error(error);
      throw new UnauthorizedError();
    }
    const jwt = str.replace('Bearer ', '');
    const user = await getUserFromJwt(jwt);
    Object.assign(req, { user });
    return await fn(req as AuthenticatedRequest, res);
  };
}

export function toApiResponseFormat<T>(data: T): { data: T } {
  return { data };
}

export function userToApiResponse(user: User) {
  const { _id, username, address, balance } = user;
  return { _id, username, address, balance };
}
