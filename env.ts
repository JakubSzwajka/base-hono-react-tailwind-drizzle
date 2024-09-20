import { z } from 'zod';
import { config } from 'dotenv';
/**
 * Specify your server-side environment variables schema here. This way you can ensure the app isn't
 * built with invalid env vars.
 */

config();

export const NodeEnv = {
  development: 'development',
  production: 'production',
  test: 'test',
} as const;

const api = z.object({
  NODE_ENV: z.nativeEnum(NodeEnv),
  DATABASE_URL: z.string(),
    // DB_HOST: z.string(),
    // DB_USER: z.string(),
    // DB_PASSWORD: z.string(),
    // DB_NAME: z.string(),
    // DB_PORT: z.string(),
  });

const processEnv = {
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  // DB_HOST: process.env.DB_HOST,
    // DB_USER: process.env.DB_USER,
    // DB_PASSWORD: process.env.DB_PASSWORD,
    // DB_NAME: process.env.DB_NAME,
    // DB_PORT: process.env.DB_PORT,
};

type ApiSchemaInput = z.infer<typeof api>;
type ApiSchemaOutput = z.infer<typeof api>;
type ApiSafeParseReturn = z.SafeParseReturnType<
  ApiSchemaInput,
  ApiSchemaOutput
>;

let env = process.env as ApiSchemaOutput;

const skip =
  process.env.SKIP_ENV_VALIDATION === 'true' ||
  process.env.SKIP_ENV_VALIDATION === '1';

if (!skip) {
  const parsed: ApiSafeParseReturn = api.safeParse(processEnv);

  if (parsed.success === false) {
    const errors = parsed.error.flatten().fieldErrors;
    console.error('❌ Invalid environment variables:', JSON.stringify(errors));
    throw new Error(`Invalid environment variables ${JSON.stringify(errors)}`);
  }

  env = new Proxy(parsed.data, {
    get(target, prop) {
      return target[prop as keyof typeof target];
    },
  });
}
export { env };
