import { Counter } from 'components'

import type { Props } from './types'

export default function FancyCounter(props: Props) {
  return (
    <form>
      <fieldset>
        <legend>This is my fancy counter</legend>
        <Counter {...props} />
      </fieldset>
    </form>
  )
}
