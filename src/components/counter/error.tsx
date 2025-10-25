import type { FallbackProps as Props } from "react-error-boundary";

export default function Button({
  error: { message },
  resetErrorBoundary,
}: Props) {
  return (
    <dl>
      <dt>⚠️ Error: ⚠️</dt>
      <dd>{message}</dd>
      <dd>
        <button onClick={resetErrorBoundary}>Try again</button>
      </dd>
    </dl>
  );
}
