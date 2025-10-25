import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { theming } from "@/store/slices";
import { Counter } from "@/components";

export default function App() {
  const dispatch = useDispatch();
  const skin = useSelector(theming.selectors.get);

  const onClick = useCallback(
    (event) => {
      const target = skin === "default" ? "dark" : "default";

      event.preventDefault();

      return dispatch(theming.actions.set(target));
    },
    [dispatch, skin]
  );

  return (
    <div className="App">
      <h1>
        Hello CodeSandbox (skin:{" "}
        <a href="" onClick={onClick}>
          {skin}
        </a>
        )
      </h1>
      <h2>Start editing to see some magic happen!</h2>
      <Counter>First button</Counter>
      <Counter>Second button</Counter>
      <Counter>Third third</Counter>
    </div>
  );
}
