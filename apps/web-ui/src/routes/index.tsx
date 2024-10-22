import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@acme/ui";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const [count, setCount] = useState(1);
  return (
    <div className="border-border m-auto mt-10 max-w-[200px] rounded-xl border-2 p-3">
      <h3>Welcome Home!</h3>
      <Button onClick={() => setCount(count + 1)}>Count: {count}</Button>
    </div>
  );
}
