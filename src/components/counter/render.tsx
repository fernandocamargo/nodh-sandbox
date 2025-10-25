import { type MouseEventHandler, useCallback, useState } from "react";

import type { Props } from "./types";

const increment = (value: number) => value + 1;

export default function Button({ children, ...props }: Props) {
  const [times, setTimes] = useState(0);

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      setTimes(increment);

      return props.onClick?.(event);
    },
    [props.onClick]
  );

  return (
    <button {...props} onClick={onClick} part="button-container">
      <>
        {children}
        {!!times && ` (pressed ${times} time(s))`}
      </>
    </button>
  );
}
