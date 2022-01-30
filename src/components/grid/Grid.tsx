import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'

type Props = {
  guesses: string[]
  currentGuess: string,
  solution: string,
  maxGuesses: number
}

export const Grid = ({ guesses, currentGuess, solution, maxGuesses }: Props) => {
  // const empties = guesses.length < 10 ? Array.from(Array(10 - guesses.length)) : []
  // const empties = guesses.length === maxGuesses ? Array.from(Array(0)) : Array.from(Array(1))

  return (
    <div className="pb-6">
      {guesses.map((guess, i) => (
        <CompletedRow key={i} guess={guess} solution={solution} />
      ))}
      <div className={`${guesses.length === maxGuesses ? 'text-red-500' : ''}`}>
        {guesses.length < maxGuesses + 1 && <CurrentRow guess={currentGuess} />}
      </div>
      {/* {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))} */}
    </div>
  )
}
