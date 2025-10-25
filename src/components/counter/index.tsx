import { type Root, createRoot } from "react-dom/client";
import { Suspense, lazy, useEffect, useRef } from "react";
import { addListener, createListenerMiddleware } from "@reduxjs/toolkit";
import { ErrorBoundary } from "react-error-boundary";

import { listener } from "@/store";
import { theming } from "@/store/slices";

import type { Props } from "./types";
import Placeholder from "./placeholder";

const SKINS = {
  default: "./style",
  dark: "./styles/dark",
} as const;

export const LazyCounter = lazy(() =>
  Promise.all([
    import("./error"),
    import("./render"),
    import(SKINS.default),
  ]).then(
    ([
      { default: FallbackComponent },
      { default: Render },
      { default: styles },
    ]) => {
      const sheet = new CSSStyleSheet();

      sheet.replaceSync(styles);

      listener.startListening({
        actionCreator: theming.actions.set,
        effect: async ({ payload: skin }) =>
          import(SKINS[skin]).then(({ default: styles }) =>
            sheet.replaceSync(styles)
          ),
      });

      customElements.define(
        "styled-counter",
        class extends HTMLElement {
          constructor() {
            super();
          }

          root: Root | void = undefined;

          shadow = this.attachShadow({ mode: "open" });

          connectedCallback() {
            this.root = createRoot(this.shadow);

            this.shadow.adoptedStyleSheets = [sheet];

            this.addEventListener("render", this.render);
          }

          disconnectedCallback() {
            this.root = this.root?.unmount();

            this.shadow.adoptedStyleSheets = [];

            this.removeEventListener("render", this.render);
          }

          render = (event: Event) => {
            const { detail: props } = event as CustomEvent<Props>;

            this.root?.render(
              <ErrorBoundary FallbackComponent={FallbackComponent}>
                <Render {...props} />
              </ErrorBoundary>
            );
          };
        }
      );

      const StyledCounter = (props: Props) => {
        const ref = useRef<HTMLElement>(null);

        useEffect(
          () =>
            void ref.current?.dispatchEvent(
              new CustomEvent("render", { detail: props })
            ),
          [props]
        );

        return <styled-counter ref={ref} />;
      };

      return { default: StyledCounter };
    }
  )
);

export default function Counter(props: Props) {
  return (
    <Suspense fallback={<Placeholder />}>
      <LazyCounter {...props} />
    </Suspense>
  );
}
