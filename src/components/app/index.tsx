import { type MouseEventHandler, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { theming } from 'store/slices'
import { Counter, FancyCounter } from 'components'

const reverse = (value: boolean) => !value

export default function App() {
  const dispatch = useDispatch()
  const skin = useSelector(theming.selectors.get)
  const [visible, toggle] = useState(true)

  const toggleSkin = useCallback<MouseEventHandler<HTMLAnchorElement>>(
    (event) => {
      const target = skin === 'default' ? 'dark' : 'default'

      event.preventDefault()

      return dispatch(theming.actions.set(target))
    },
    [dispatch, skin],
  )

  const toggleCountersVisibility = useCallback<MouseEventHandler<HTMLButtonElement>>(
    () => toggle(reverse),
    [],
  )

  return (
    <div className="App">
      <h1>
        <span>Hello CodeSandbox (skin:</span>
        <> </>
        <a href="" onClick={toggleSkin}>
          {skin}
        </a>
        <span>)</span>
      </h1>
      <h2>Start editing to see some magic happen!</h2>
      <dl>
        <dt>Controls</dt>
        <dd>
          <button onClick={toggleCountersVisibility}>{visible ? 'Hide' : 'Show'} counters</button>
        </dd>
      </dl>
      {visible && (
        <>
          <Counter>First button</Counter>
          <Counter>Second button</Counter>
          <Counter>Third button</Counter>
        </>
      )}
      <FancyCounter>Fourth button</FancyCounter>
    </div>
  )
}
