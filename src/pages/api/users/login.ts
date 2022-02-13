import {
  routeHandler,
  toApiResponseFormat,
  userToApiResponse,
} from '../../../services/api';
import { validateCreateUserPayload } from '../../../services/validation';
import {
  fetchUserByUsernameFromDb,
  generateUserJwt,
} from '../../../businessLogics/users';
import { UserNotFoundError, WrongPasswordError } from '../../../errors';
import { hashString } from '../../../services/cryptography';

const usersLoginApi = routeHandler({
  post: async (req, res) => {
    const { username, password } = validateCreateUserPayload(req.body);
    const user = await fetchUserByUsernameFromDb(username);
    if (user === null) throw new UserNotFoundError();
    if (user.passwordHash !== hashString(password))
      throw new WrongPasswordError();
    const jwt = generateUserJwt(user);
    return res.status(200).json(
      toApiResponseFormat({
        user: userToApiResponse(user),
        jwt,
      }),
    );
  },
});

export default usersLoginApi;
