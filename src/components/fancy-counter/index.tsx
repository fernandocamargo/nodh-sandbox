import { createPortal } from 'react-dom'
import { Suspense, lazy, useLayoutEffect, useRef, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { listener } from 'store'
import { theming } from 'store/slices'

import type { Props } from './types'
import Placeholder from './placeholder'

const SKINS = {
  default: () => import('./style'),
  dark: () => import('./styles/dark'),
} as const

export const LazyCounter = lazy(() =>
  Promise.all([import('./error'), import('./render'), SKINS.default()]).then(
    ([{ default: FallbackComponent }, { default: Render }, { default: styles }]) => {
      const sheet = new CSSStyleSheet()

      sheet.replaceSync(styles)

      listener.startListening({
        actionCreator: theming.actions.set,
        effect: async ({ payload: skin }) =>
          SKINS[skin as keyof typeof SKINS]().then(({ default: styles }) =>
            sheet.replaceSync(styles),
          ),
      })

      customElements.define(
        'styled-fancy-counter',
        class extends HTMLElement {
          constructor() {
            super()
          }

          shadow = this.attachShadow({ mode: 'open' })

          connectedCallback() {
            this.shadow.adoptedStyleSheets = [sheet]
          }

          disconnectedCallback() {
            this.shadow.adoptedStyleSheets = []
          }
        },
      )

      const StyledCounter = (props: Props) => {
        const ref = useRef<HTMLElement>(null)
        const [container, propagate] = useState<DocumentFragment | ShadowRoot>(
          document.createDocumentFragment(),
        )

        useLayoutEffect(() => propagate(ref.current?.shadowRoot as ShadowRoot), [])

        return (
          <styled-fancy-counter ref={ref}>
            {createPortal(
              <ErrorBoundary FallbackComponent={FallbackComponent}>
                <Render {...props} />
              </ErrorBoundary>,
              container,
            )}
          </styled-fancy-counter>
        )
      }

      return { default: StyledCounter }
    },
  ),
)

export default function Counter(props: Props) {
  return (
    <Suspense fallback={<Placeholder />}>
      <LazyCounter {...props} />
    </Suspense>
  )
}
