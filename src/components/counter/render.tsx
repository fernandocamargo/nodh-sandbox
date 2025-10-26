import { type MouseEventHandler, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'

import { theming } from 'store/slices'

import type { Props } from './types'

const increment = (value: number) => value + 1

export default function Button({ children, ...props }: Props) {
  const [times, setTimes] = useState(0)
  const skin = useSelector(theming.selectors.get)

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      setTimes(increment)

      return props.onClick?.(event)
    },
    [props.onClick],
  )

  return (
    <button {...props} onClick={onClick} part="container">
      <strong part="label">{children}</strong>
      {!!times && (
        <>
          <> </>
          <em part="hits">(pressed {times} time(s))</em>
        </>
      )}
      <>
        <> </>
        <code part="skin">[{skin}]</code>
      </>
    </button>
  )
}
