import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'

type Props = {
  guesses: string[]
  currentGuess: string,
  solution: string
}

export const Grid = ({ guesses, currentGuess, solution }: Props) => {
  return (
    <div className="pb-6">
      {guesses.map((guess, i) => (
        <CompletedRow key={i} guess={guess} solution={solution} />
      ))}
      {guesses.length < 10 && <CurrentRow guess={currentGuess} />}
    </div>
  )
}
