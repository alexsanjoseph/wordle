import { getGuessStatuses } from '../../lib/statuses'
import { Cell } from './Cell'

type Props = {
  guess: string,
  startDate: Date
}

export const CompletedRow = ({ guess, startDate }: Props) => {

  const statuses = getGuessStatuses(guess, startDate)

  return (
    <div className="flex justify-center mb-1">
      {guess.split('').map((letter, i) => (
        <Cell key={i} value={letter} status={statuses[i]} />
      ))}
    </div>
  )
}
