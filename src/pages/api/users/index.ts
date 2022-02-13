import { createUserInDb, generateUserJwt } from '../../../businessLogics/users';
import {
  privateRouteHandler,
  routeHandler,
  toApiResponseFormat,
  userToApiResponse,
} from '../../../services/api';
import { eth } from '../../../services/blockchain/commons';
import { validateCreateUserPayload } from '../../../services/validation';

const usersApi = routeHandler({
  post: async (req, res) => {
    const { username, password } = validateCreateUserPayload(req.body);
    const user = await createUserInDb(username, password);
    const jwt = generateUserJwt(user);
    return res.status(201).json(
      toApiResponseFormat({
        user: userToApiResponse(user),
        jwt,
      }),
    );
  },
  get: privateRouteHandler(async (req, res) => {
    const x = await eth.getPastLogs({fromBlock: '0x0', address: req.user.address});
    console.log(x);
    return res
      .status(200)
      .json(toApiResponseFormat(userToApiResponse(req.user)));
  }),
});

export default usersApi;
