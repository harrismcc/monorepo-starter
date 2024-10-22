import { Hono } from "hono";
import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "@acme/api";

const app = new Hono();

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
    // Here is where you pass in the context that TRPC uses
    createContext: async (_opts, c) => {
      return {
        user: c.get("user"),
        session: c.get("session"),
      };
    },
  }),
);

export default {
  port: 3817,
  fetch: app.fetch,
};
