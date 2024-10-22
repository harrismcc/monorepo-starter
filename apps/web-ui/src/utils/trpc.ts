import type { AppRouter } from "@acme/api";
import { createTRPCClient, createTRPCReact } from "@trpc/react-query";
import SuperJSON from "superjson";
import { httpBatchLink, loggerLink, TRPCClientError } from "@trpc/client";

export const getBaseUrl = () => {
  return "http://localhost:3817";
  if (typeof window !== "undefined") return window.location.origin;
  // eslint-disable-next-line no-restricted-properties
  return `http://localhost:${process.env.PORT ?? 3817}`;
};

export const trpcClientOptions = {
  links: [
    loggerLink({
      enabled: (op) =>
        // eslint-disable-next-line no-restricted-properties
        process.env.NODE_ENV === "development" ||
        (op.direction === "down" && op.result instanceof Error),
    }),
    httpBatchLink({
      transformer: SuperJSON,
      url: getBaseUrl() + "/trpc",
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: "include",
        });
      },
      async headers() {
        return {
          authorization: await Promise.resolve(""),
        };
      },
    }),
  ],
};

export const trpc = createTRPCReact<AppRouter>();

export const vanillaTrpc = createTRPCClient<AppRouter>(trpcClientOptions);

export function isTRPCClientError(
  cause: unknown,
): cause is TRPCClientError<AppRouter> {
  return cause instanceof TRPCClientError;
}
