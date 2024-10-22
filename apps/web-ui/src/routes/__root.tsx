import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TRPCReactProvider } from "@/utils/TRPCReactProvider";
import { vanillaTrpc } from "@/utils/trpc";

const App: React.FC = () => {
  return (
    <TRPCReactProvider>
      <Outlet />
    </TRPCReactProvider>
  );
};

export const Route = createRootRouteWithContext<{
  trpc: typeof vanillaTrpc;
}>()({
  component: App,
});
