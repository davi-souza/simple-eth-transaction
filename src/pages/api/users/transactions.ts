import { sendTransaction } from '../../../businessLogics/users';
import {
  privateRouteHandler,
  routeHandler,
  toApiResponseFormat,
  userToApiResponse,
} from '../../../services/api';
import { validateSendTransactionPayload } from '../../../services/validation';

const usersTransactionsApi = routeHandler({
  post: privateRouteHandler(async (req, res) => {
    const { toAddress, amount } = validateSendTransactionPayload(req.body);
    const newUser = await sendTransaction(req.user, toAddress, amount);
    return res
      .status(201)
      .json(toApiResponseFormat(userToApiResponse(newUser)));
  }),
});

export default usersTransactionsApi;
