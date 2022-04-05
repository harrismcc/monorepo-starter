import { addOne } from "@main/utils";
import React, { useState } from "react";

export const App: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Hello New Project!</h1>
      This is a new project.
      <div>
        <button
          type="button"
          onClick={() => setCount((count) => addOne(count))}
        >
          count is: {count}
        </button>
      </div>
    </>
  );
};

export default App;
