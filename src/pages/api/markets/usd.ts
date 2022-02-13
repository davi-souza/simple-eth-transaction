import { getPriceInUsd } from '../../../businessLogics/markets';
import {
  privateRouteHandler,
  routeHandler,
  toApiResponseFormat,
} from '../../../services/api';

const marketsUsdApi = routeHandler({
  get: privateRouteHandler(async (_req, res) => {
    const priceInUsd = await getPriceInUsd();
    return res.status(200).json(toApiResponseFormat(priceInUsd));
  }),
});

export default marketsUsdApi;
