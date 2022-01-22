import { getGuessStatuses } from './statuses'

export const shareStatus = (guesses: string[], solution: string) => {
  navigator.clipboard.writeText(
    'Wordle ' +
    //   getWordOfDay(startDate).solutionIndex +
      "1" +
      ' ' +
      guesses.length +
      '/10\n\n' +
      generateEmojiGrid(guesses, solution)
  )
}

export const generateEmojiGrid = (guesses: string[], solution: string) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(guess, solution)
      return guess
        .split('')
        .map((letter, i) => {
          switch (status[i]) {
            case 'correct':
              return '🟩'
            case 'present':
              return '🟨'
            default:
              return '⬜'
          }
        })
        .join('')
    })
    .join('\n')
}
