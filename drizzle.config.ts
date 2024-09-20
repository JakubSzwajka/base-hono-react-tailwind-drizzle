import { defineConfig } from 'drizzle-kit';
import { env } from './env';

export const getCredentials = () => {
  console.log(
    `🛠️ Loading db credentials for ${env.NODE_ENV}.`,
  );
  return {
    url: env.DATABASE_URL,
    // host: env.DB_HOST,
    // port: parseInt(env.DB_PORT),
    // user: env.DB_USER,
    // password: env.DB_PASSWORD,
    // database: env.DB_NAME,
    ssl: false,
  };
};

export default defineConfig({
  dialect: 'postgresql',
  schema: './server/db/schema/schema.ts',
  out: './migrations',
  verbose: true,
  strict: true,
  dbCredentials: getCredentials(),
});
