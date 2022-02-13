const {
  DATABASE_NAME,
  DATABASE_URL,
  JWT_SECRET,
  WEB3_HTTP_ADDRESS,
  WEB3_WSS_ADDRESS,
  CIPHER_KEY,
  CIPHER_IV,
} = process.env;

const mustHaveEnvVars = {
  DATABASE_NAME,
  DATABASE_URL,
  WEB3_HTTP_ADDRESS,
  WEB3_WSS_ADDRESS,
  CIPHER_KEY,
  CIPHER_IV,
};
const missingEnvVars = Object.entries(mustHaveEnvVars).filter(
  ([_, value]) => !value,
);

if (missingEnvVars.length > 0) {
  throw new Error(`Must set: ${missingEnvVars.map(([key]) => key).join(', ')}`);
}

const dbName = DATABASE_NAME as string;

export const dbConfig = {
  dbName,
  collections: {
    users: 'users',
  },
  url:
    DATABASE_URL ||
    `mongodb://mongoadmin:secret@mongodb/${dbName}?authSource=admin`,
};

const cipher = {
  key: Buffer.from(CIPHER_KEY as string, 'hex'),
  iv: Buffer.from(CIPHER_IV as string, 'hex'),
};

export const keysConfig = {
  cipher,
  jwtSecret: JWT_SECRET || 'jwt-secret',
};

export const blockchainConfig = {
  httpAddress: WEB3_HTTP_ADDRESS as string,
  wssAddress: WEB3_WSS_ADDRESS as string,
};
