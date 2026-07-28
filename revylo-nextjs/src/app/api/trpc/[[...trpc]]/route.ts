import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/server/routers";
import { createContext } from "@/server/context";

const handler = (req: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req, new Response()),
  });
};

export { handler as GET, handler as POST };

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
