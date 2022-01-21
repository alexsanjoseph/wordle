import { MiniCompletedRow } from './MiniCompletedRow'

type Props = {
  guesses: string[],
  startDate: Date
}

export const MiniGrid = ({ guesses, startDate }: Props) => {
  return (
    <div className="pb-6">
      {guesses.map((guess, i) => (
        <MiniCompletedRow key={i} guess={guess} startDate={startDate}/>
      ))}
    </div>
  )
}
