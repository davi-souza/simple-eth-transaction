import crypto from 'crypto';
import { keysConfig } from '../../config';

export function hashString(str: string): string {
  return crypto.createHash('sha256').update(str).digest('hex');
}

export function encryptString(str: string) {
  const cipher = crypto.createCipheriv(
    'aes256',
    keysConfig.cipher.key,
    keysConfig.cipher.iv,
  );
  return cipher.update(str, 'utf8', 'hex') + cipher.final('hex');
}

export function decryptString(str: string) {
  const decipher = crypto.createDecipheriv(
    'aes256',
    keysConfig.cipher.key,
    keysConfig.cipher.iv,
  );
  return decipher.update(str, 'hex', 'utf8') + decipher.final('utf8');
}
