import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { database } from "~/database/context";
import { user, account, session, verification } from "~/database/schema";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(database(), {
    provider: "pg",
    schema: {
      user,
      verification,
      account,
      session,
    },
  }),
});
