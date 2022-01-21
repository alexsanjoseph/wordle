import { getGuessStatuses } from '../../lib/statuses'
import { MiniCell } from './MiniCell'

type Props = {
  guess: string,
  startDate: Date
}

export const MiniCompletedRow = ({ guess, startDate }: Props) => {
  const statuses = getGuessStatuses(guess, startDate)

  return (
    <div className="flex justify-center mb-1">
      {guess.split('').map((letter, i) => (
        <MiniCell key={i} status={statuses[i]} />
      ))}
    </div>
  )
}
