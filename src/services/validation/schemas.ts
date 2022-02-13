import Joi from 'joi';

export const authorizationHeaderSchema = Joi.string()
  .pattern(new RegExp('^Bearer .*$'))
  .required();

export const createUserPayloadSchema = Joi.object<
  Readonly<{
    username: string;
    password: string;
  }>
>({
  username: Joi.string().required(),
  password: Joi.string().required(),
}).required();

export const sendTransactionPayloadSchema = Joi.object<
  Readonly<{
    toAddress: string;
    amount: number;
  }>
>({
  toAddress: Joi.string().required(),
  amount: Joi.number().greater(0).required(),
});
