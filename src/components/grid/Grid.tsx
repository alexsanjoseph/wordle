import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'

type Props = {
  guesses: string[]
  currentGuess: string,
  solution: string
}

export const Grid = ({ guesses, currentGuess, solution }: Props) => {
  // const empties = guesses.length < 10 ? Array.from(Array(10 - guesses.length)) : []
  const empties = Array.from(Array(1))

  return (
    <div className="pb-6">
      {guesses.map((guess, i) => (
        <CompletedRow key={i} guess={guess} solution={solution} />
      ))}
      {guesses.length < 10 && <CurrentRow guess={currentGuess} />}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </div>
  )
}
