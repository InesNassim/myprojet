import { createRouter } from '../../trpc/createRouter';

const appRouter = createRouter()
  .query('hello', {
    resolve: () => {
      return { message: 'Hello, world!' };
    },
  });

export default appRouter;
