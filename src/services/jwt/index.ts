import jwt from 'jsonwebtoken';
import { InvalidJwtError } from '../../errors';
import { keysConfig } from '../../config';
import { JwtUser } from '../../types';

export function jwtSign(user: JwtUser) {
  return jwt.sign(user, keysConfig.jwtSecret);
}

export function jwtVerify(token: string) {
  try {
    return jwt.verify(token, keysConfig.jwtSecret) as JwtUser;
  } catch (error) {
    console.error('Unable do verify jwt', error);
    throw new InvalidJwtError();
  }
}
