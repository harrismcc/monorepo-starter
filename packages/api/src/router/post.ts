import { createTRPCRouter, protectedProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  greeting: protectedProcedure.query(({ ctx }) => {
    return `Hello ${ctx.user?.username}`;
  }),
});
