import Joi from 'joi';
import { ValidationError } from '../../errors';
import {
  authorizationHeaderSchema,
  createUserPayloadSchema,
  sendTransactionPayloadSchema,
} from './schemas';

export function validateAuthorizationHeader(value: string | undefined) {
  return runValidation<string>(authorizationHeaderSchema, value);
}

export function validateCreateUserPayload(payload: any) {
  return runValidation(createUserPayloadSchema, payload);
}

export function validateSendTransactionPayload(payload: any) {
  return runValidation(sendTransactionPayloadSchema, payload);
}

function runValidation<T>(
  schema: Joi.ObjectSchema<T> | Joi.StringSchema,
  obj: any,
): T {
  const { value, error } = schema.validate(obj);
  if (error || value === undefined) {
    console.error(error?.message);
    throw new ValidationError(error?.message);
  }
  return value;
}
